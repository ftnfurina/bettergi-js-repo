type SettingVolume = '不修改' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'

interface Settings {
  /** 主音量 */
  readonly mainVolume: SettingVolume
  /** 音乐音量 */
  readonly musicVolume: SettingVolume
  /** 语音音量 */
  readonly dialogueVolume: SettingVolume
  /** 音效音量 */
  readonly sfxVolume: SettingVolume
}
