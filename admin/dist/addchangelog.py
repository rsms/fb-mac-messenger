# encoding: utf-8
import sys, re, os, time, subprocess

if len(sys.argv) < 2:
  print >> sys.stderr, 'usage: '+sys.argv[0]+' <archive>'
  sys.exit(1)

filepath = sys.argv[1]
filename = os.path.basename(filepath)
filestat = os.stat(filepath)

version, version_release, timestamp, git_hash =\
  re.findall(r'\-(([0-9]+\.[0-9]+\.[0-9]+)\.([0-9]+))\-([0-9A-Fa-f]+)\.zip$', filename)[0]

itembuf = '''
    <item>
      <title>Messenger for Mac {version_release}</title>
      <description><![CDATA[
        <ul>
{changes}
        </ul>
      ]]></description>
      <pubDate>{pubdate}</pubDate>
      <sparkle:minimumSystemVersion>10.9</sparkle:minimumSystemVersion>
      <enclosure
        gitrev="{gitrev}"
        url="https://fbmacmessenger.rsms.me/dist/{filename}"
        sparkle:version="{version}"
        length="{filesize}"
        type="application/octet-stream" />
    </item>
'''

# Load changelog
changelogFilename =\
  os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) +\
  '/website/changelog.xml'
with open(changelogFilename, 'r') as f:
  buf = f.read()

# Make sure this version isn't in the changelog already
if version in re.findall(r'sparkle:version="([0-9\.]+)\-', buf):
  print >> sys.stderr, ('Version %s is already in %s -- you need to manually '\
  'remove it and re-run this script.') % (version, changelogFilename)
  sys.exit(1)

changes = '          <li>Initial release</li>'

# find previous version's git hash
newGitHash = git_hash
prevGitHash = re.findall(r'gitrev="([0-9A-Fa-f]+)"', buf)
if len(prevGitHash) != 0:
  prevGitHash = prevGitHash[0]

  # extract git log since last version
  gitlog = subprocess.check_output(
    "git log "+prevGitHash+'..'+newGitHash+' --no-merges --date-order --notes --oneline',
    shell=True)
  changes = ''
  for line in gitlog.strip().split("\n"):
    changes += '          <li>' + line + '</li>\n'

# Format item template
mtime = time.localtime(filestat.st_mtime)
pubdate = time.strftime("%a, %d %b %G %T %z", mtime)
itembuf = itembuf.format(
  version=version,
  version_release=version_release,
  gitrev=git_hash,
  pubdate=pubdate,
  filesize=filestat.st_size,
  filename=filename,
  changes=changes.rstrip())

if buf.find('<item>') != -1:
  buf = re.compile(r'(\n[ \r\n\t]*<item>)', re.M).sub(itembuf.rstrip() + r'\1', buf, 1)
else:
  buf = re.compile(r'(\n[ \r\n\t]*</channel>)', re.M).sub(itembuf.rstrip() + r'\1', buf, 1)

with open(changelogFilename, 'w') as f:
  f.write(buf)
