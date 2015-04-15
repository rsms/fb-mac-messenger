#pragma once

namespace VirtualKeyCodes {
  /*
   *  Summary:
   *    Virtual keycodes
   *
   *  Discussion:
   *    These constants are the virtual keycodes defined originally in
   *    Inside Mac Volume V, pg. V-191. They identify physical keys on a
   *    keyboard. Those constants with "ANSI" in the name are labeled
   *    according to the key position on an ANSI-standard US keyboard.
   *    For example, kVK_ANSI_A indicates the virtual keycode for the key
   *    with the letter 'A' in the US keyboard layout. Other keyboard
   *    layouts may have the 'A' key label on a different physical key;
   *    in this case, pressing 'A' will generate a different virtual
   *    keycode.
   */
  enum {
    ANSI_A                    = 0x00,
    ANSI_S                    = 0x01,
    ANSI_D                    = 0x02,
    ANSI_F                    = 0x03,
    ANSI_H                    = 0x04,
    ANSI_G                    = 0x05,
    ANSI_Z                    = 0x06,
    ANSI_X                    = 0x07,
    ANSI_C                    = 0x08,
    ANSI_V                    = 0x09,
    ANSI_B                    = 0x0B,
    ANSI_Q                    = 0x0C,
    ANSI_W                    = 0x0D,
    ANSI_E                    = 0x0E,
    ANSI_R                    = 0x0F,
    ANSI_Y                    = 0x10,
    ANSI_T                    = 0x11,
    ANSI_1                    = 0x12,
    ANSI_2                    = 0x13,
    ANSI_3                    = 0x14,
    ANSI_4                    = 0x15,
    ANSI_6                    = 0x16,
    ANSI_5                    = 0x17,
    ANSI_Equal                = 0x18,
    ANSI_9                    = 0x19,
    ANSI_7                    = 0x1A,
    ANSI_Minus                = 0x1B,
    ANSI_8                    = 0x1C,
    ANSI_0                    = 0x1D,
    ANSI_RightBracket         = 0x1E,
    ANSI_O                    = 0x1F,
    ANSI_U                    = 0x20,
    ANSI_LeftBracket          = 0x21,
    ANSI_I                    = 0x22,
    ANSI_P                    = 0x23,
    ANSI_L                    = 0x25,
    ANSI_J                    = 0x26,
    ANSI_Quote                = 0x27,
    ANSI_K                    = 0x28,
    ANSI_Semicolon            = 0x29,
    ANSI_Backslash            = 0x2A,
    ANSI_Comma                = 0x2B,
    ANSI_Slash                = 0x2C,
    ANSI_N                    = 0x2D,
    ANSI_M                    = 0x2E,
    ANSI_Period               = 0x2F,
    ANSI_Grave                = 0x32,
    ANSI_KeypadDecimal        = 0x41,
    ANSI_KeypadMultiply       = 0x43,
    ANSI_KeypadPlus           = 0x45,
    ANSI_KeypadClear          = 0x47,
    ANSI_KeypadDivide         = 0x4B,
    ANSI_KeypadEnter          = 0x4C,
    ANSI_KeypadMinus          = 0x4E,
    ANSI_KeypadEquals         = 0x51,
    ANSI_Keypad0              = 0x52,
    ANSI_Keypad1              = 0x53,
    ANSI_Keypad2              = 0x54,
    ANSI_Keypad3              = 0x55,
    ANSI_Keypad4              = 0x56,
    ANSI_Keypad5              = 0x57,
    ANSI_Keypad6              = 0x58,
    ANSI_Keypad7              = 0x59,
    ANSI_Keypad8              = 0x5B,
    ANSI_Keypad9              = 0x5C
  };
  
  /* keycodes for keys that are independent of keyboard layout*/
  enum {
    Return                    = 0x24,
    Tab                       = 0x30,
    Space                     = 0x31,
    Delete                    = 0x33,
    Escape                    = 0x35,
    Command                   = 0x37,
    Shift                     = 0x38,
    CapsLock                  = 0x39,
    Option                    = 0x3A,
    Control                   = 0x3B,
    RightShift                = 0x3C,
    RightOption               = 0x3D,
    RightControl              = 0x3E,
    Function                  = 0x3F,
    F17                       = 0x40,
    VolumeUp                  = 0x48,
    VolumeDown                = 0x49,
    Mute                      = 0x4A,
    F18                       = 0x4F,
    F19                       = 0x50,
    F20                       = 0x5A,
    F5                        = 0x60,
    F6                        = 0x61,
    F7                        = 0x62,
    F3                        = 0x63,
    F8                        = 0x64,
    F9                        = 0x65,
    F11                       = 0x67,
    F13                       = 0x69,
    F16                       = 0x6A,
    F14                       = 0x6B,
    F10                       = 0x6D,
    F12                       = 0x6F,
    F15                       = 0x71,
    Help                      = 0x72,
    Home                      = 0x73,
    PageUp                    = 0x74,
    ForwardDelete             = 0x75,
    F4                        = 0x76,
    End                       = 0x77,
    F2                        = 0x78,
    PageDown                  = 0x79,
    F1                        = 0x7A,
    LeftArrow                 = 0x7B,
    RightArrow                = 0x7C,
    DownArrow                 = 0x7D,
    UpArrow                   = 0x7E
  };
}