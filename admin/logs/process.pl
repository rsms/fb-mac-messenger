#!/usr/bin/perl -w
use strict;
use warnings;
# use Data::Dumper;
use Time::Piece;

# Based on https://gist.github.com/KaanErturk/5201147

my $download_count = 0;
my $update_checks_ip_map = {};
my $update_checks_dev_map = {};
my $website_visits_count = 0;
my $website_visits_unique_map = {};

sub parse_entry {
  # Parse the whole line at once and store in an array
  # This is future proof since AWS will add things to the end
  my @ent = ($_ =~ m/(?(?=[\["]).+?[\]"]|[^\s]+)/ig);

  # Extract values within [] and ""
  $_ =~ s/[\["](.+)[\]"]/$1/ig foreach (@ent);

  if ($ent[7] =~ /^dist\/Messenger-.+\.zip/) {
    $download_count++;
  } elsif ($ent[7] =~ /^index\.html$/) {
    $website_visits_count++;
    if (!$website_visits_unique_map->{$ent[3]}) {
      $website_visits_unique_map->{$ent[3]} = 1;
    }
  }

  if ($ent[16] =~ /\s+Sparkle\//) {
    my $device = '';
    # "Messenger/0.0.8.1433891483 Sparkle/0b186dc Device/C2WFD3NPDH2G"
    if ($ent[16] =~ m/Messenger\/([^\s]+)\s.*\sDevice\/([^\s]+)/i) {
      my $app_version = $1;
      $device = $2;
      $update_checks_dev_map->{$device} = $app_version;
    } else {
      # Fall back on IP
      $device = $ent[3];
      if (!$update_checks_ip_map->{$device}) {
        $update_checks_ip_map->{$device} = 1;
      }
    }
  }

  # Example:
  # print Dumper(@ent) . "\n";
  # $ent[0]  = '1a29fc66c131f7de18b69429b2790624141c71ab7b1ae925e5baf34e757ea8e3';
  # $ent[1]  = 'fbmacmessenger.rsms.me';
  # $ent[2]  = '09/Jun/2015:20:27:03 +0000';
  # $ent[3]  = '68.38.204.102';
  # $ent[4]  = '-';
  # $ent[5]  = '413D46F8F80228C3';
  # $ent[6]  = 'WEBSITE.GET.OBJECT';
  # $ent[7]  = 'index.html';
  # $ent[8]  = 'GET / HTTP/1.1';
  # $ent[9]  = '200';
  # $ent[10] = '-';
  # $ent[11] = '7380';
  # $ent[12] = '7380';
  # $ent[13] = '44';
  # $ent[14] = '43';
  # $ent[15] = 'https://www.google.com/';
  # $ent[16] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36';
  # $ent[17] = '-';
}

if ($#ARGV == 0 && -d $ARGV[0]) {
  # Process all files in a directory
  opendir(DIR, $ARGV[0]) or die $!;
  print "Analyzing all files in directory \"" . $ARGV[0] . "\" ...\n";
  my $file_count = 0;
  while (my $file = readdir(DIR)) {
    # ignore dotfiles
    next if ($file =~ m/^\./);
    my $path = "$ARGV[0]/$file";
    next unless (-f $path);
    # print "Analyzing $file\n";
    open (FILE, $path) || die "Couldn't open $path: $!";
    while (<FILE>) {
      parse_entry();
    }
    $file_count++;
  }
  close DIR;
  print "Analyzed $file_count files.\n";
} else {
  # Lines arrive via stdin or by list of files
  while (<>) {
    parse_entry();
  }
}

# Note: "installed version" is only counted once for a certain device, meaning that
# if device A has version 0.1 installed at 2015-01-01, and later at 2015-01-02 the
# same device (A) reports version 0.2, only version 0.2 is counted as installed.
# Essentially we count the most recently installed version per device.
my $update_checks_dev_version_map = {};
my @devices = keys $update_checks_dev_map;
for my $device (@devices) {
  my $version = $update_checks_dev_map->{$device};
  if (!$update_checks_dev_version_map->{$version}) {
    $update_checks_dev_version_map->{$version} = 1;
  } else {
    $update_checks_dev_version_map->{$version} ++;
  }
}

my $update_checks_ip_count = keys $update_checks_ip_map;
my $update_checks_dev_count = $#devices+1;
my $website_visits_unique_count = keys $website_visits_unique_map;

printf "Total downloads:            %10d\n", $download_count;
printf "Total installs (IPs):       %10d\n", $update_checks_ip_count;
printf "Unique device installs:     %10d\n", $update_checks_dev_count;
printf "Website visits:             %10d\n", $website_visits_count;
printf "Website IP-unique visits:   %10d\n", $website_visits_unique_count;

print  "Versions installed (unique per identified device):\n";

my @versions = reverse sort keys $update_checks_dev_version_map;
for my $version (@versions) {
  my $v = $version;
  if ($version =~ m/^(\d\.\d\.\d\.)(\d+)$/) {
    $v = $1 . gmtime($2)->strftime('%FT%TZ');
  }
  printf " %-26s %10d\n", $v, $update_checks_dev_version_map->{$version};
}
