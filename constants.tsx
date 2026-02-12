
import { DebloatItem, EssentialApp, FixItem } from './types';

export const DEBLOAT_ITEMS: DebloatItem[] = [
  {
    id: '1',
    title: 'Cortana Assistant',
    description: 'Microsoft\'s legacy voice assistant that remains in the system even if unused.',
    category: 'apps',
    impact: 'medium',
    command: 'Get-AppxPackage -allusers Microsoft.549981C3F5F10 | Remove-AppxPackage',
    version: 'win10'
  },
  {
    id: '2',
    title: 'Windows Copilot',
    description: 'The new AI assistant integrated into Windows 11 taskbar and sidebar.',
    category: 'apps',
    impact: 'medium',
    command: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v ShowCopilotButton /t REG_DWORD /d 0 /f',
    version: 'win11'
  },
  {
    id: 'storage-1',
    title: 'Cleanup System Component Store (WinSxS)',
    description: 'Removes old versions of system components replaced by Windows Updates. Can save 5GB-15GB+.',
    category: 'performance',
    impact: 'high',
    command: 'dism.exe /online /Cleanup-Image /StartComponentCleanup /ResetBase',
    version: 'both'
  },
  {
    id: 'storage-2',
    title: 'Compact OS Compression',
    description: 'Compresses Windows system files and applications to save space on small drives.',
    category: 'performance',
    impact: 'high',
    command: 'compact.exe /CompactOS:always',
    version: 'both'
  },
  {
    id: 'storage-3',
    title: 'Disable Hibernation (Remove hiberfil.sys)',
    description: 'Deletes the file used for Fast Startup and Hibernation. Saves space equal to ~75% of your RAM.',
    category: 'performance',
    impact: 'high',
    command: 'powercfg -h off',
    version: 'both'
  },
  {
    id: 'edge',
    title: 'Microsoft Edge Bloat',
    description: 'The default browser, which often has many "shopping" and "news" features enabled by default.',
    category: 'apps',
    impact: 'high',
    command: '# Manual removal is complex; best handled via group policy or specialized scripts.',
    version: 'both'
  },
  {
    id: 'xbox',
    title: 'Xbox Game Bar & Services',
    description: 'Overlay and background services for gaming features, even for non-gamers.',
    category: 'apps',
    impact: 'medium',
    command: 'Get-AppxPackage Microsoft.XboxGamingOverlay | Remove-AppxPackage',
    version: 'both'
  },
  {
    id: '3',
    title: 'OneDrive Cloud Storage',
    description: 'Cloud storage integration that starts with Windows and manages file sync.',
    category: 'system',
    impact: 'high',
    command: 'taskkill /f /im OneDrive.exe; %SystemRoot%\\SysWOW64\\OneDriveSetup.exe /uninstall',
    version: 'both'
  },
  {
    id: '4',
    title: 'Telemetry & Diagnostic Data',
    description: 'Services that collect and send usage data to Microsoft servers.',
    category: 'privacy',
    impact: 'high',
    command: 'sc config "DiagTrack" start= disabled; sc stop "DiagTrack"',
    version: 'both'
  },
  {
    id: 'news',
    title: 'News & Interests (Widgets)',
    description: 'The taskbar weather and news feed that consumes background resources.',
    category: 'performance',
    impact: 'low',
    command: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Feeds" /v "ShellFeedsTaskbarViewMode" /t REG_DWORD /d 2 /f',
    version: 'both'
  }
];

export const ESSENTIAL_APPS: EssentialApp[] = [
  {
    name: 'NanaZip',
    category: 'Utility',
    description: 'Modern, open-source file archiver. The superior alternative to the built-in Windows Zip tool.',
    url: 'https://github.com/M2Team/NanaZip',
    winget: 'winget install M2Team.NanaZip',
    icon: 'fa-file-zipper'
  },
  {
    name: 'PowerToys',
    category: 'System',
    description: 'Advanced system utilities including Window snapping, color picker, and bulk renamer.',
    url: 'https://github.com/microsoft/PowerToys',
    winget: 'winget install Microsoft.PowerToys',
    icon: 'fa-screwdriver-wrench'
  },
  {
    name: 'Everything',
    category: 'Search',
    description: 'Instant file search for Windows. Makes the default Start Menu search look like a dinosaur.',
    url: 'https://www.voidtools.com/',
    winget: 'winget install voidtools.Everything',
    icon: 'fa-magnifying-glass'
  },
  {
    name: 'Brave Browser',
    category: 'Browser',
    description: 'Privacy-focused browser. Blocks trackers that built-in Edge often allows.',
    url: 'https://brave.com/',
    winget: 'winget install Brave.Brave',
    icon: 'fa-globe'
  },
  {
    name: 'VLC Media Player',
    category: 'Media',
    description: 'Plays everything. No more "Missing Codec" errors from Windows Media Player.',
    url: 'https://www.videolan.org/',
    winget: 'winget install VideoLAN.VLC',
    icon: 'fa-play'
  },
  {
    name: 'BleachBit',
    category: 'Cleanup',
    description: 'Clean your system deeply. Much more thorough than "Disk Cleanup".',
    url: 'https://www.bleachbit.org/',
    winget: 'winget install BleachBit.BleachBit',
    icon: 'fa-broom'
  }
];

export const QUICK_FIXES: FixItem[] = [
  {
    title: 'Disable Bing in Start Search',
    description: 'Stops Windows from showing web results when you search for local files.',
    solution: 'Modify the registry to disable Bing Search.',
    code: 'reg add "HKCU\\Software\\Policies\\Microsoft\\Windows\\Explorer" /v DisableSearchBoxSuggestions /t REG_DWORD /d 1 /f'
  },
  {
    title: 'Enable Classic Context Menu',
    description: 'Restores the Windows 10 style right-click menu in Windows 11 (removes "Show more options").',
    solution: 'Add a registry key and restart Explorer.',
    code: 'reg add "HKCU\\Software\\Classes\\CLSID\\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\\InprocServer32" /f /ve'
  },
  {
    title: 'Remove "Recommended" from Start',
    description: 'Cleans up the clutter in the Windows 11 Start Menu.',
    solution: 'Change Settings or use this registry tweak.',
    code: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" /v "Start_TrackDocs" /t REG_DWORD /d 0 /f'
  }
];
