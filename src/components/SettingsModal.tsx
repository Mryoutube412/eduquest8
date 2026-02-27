import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Button } from './ui/button';

export default function SettingsModal() {
  const { settings, updateSettings, resetStats } = useGame();
  const [confirmReset, setConfirmReset] = useState(false);

  const formatDuration = (s: number) => {
    if (s >= 60) {
      const min = Math.floor(s / 60);
      const sec = s % 60;
      return sec > 0 ? `${min} dk ${sec} sn` : `${min} dk`;
    }
    return `${s} sn`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-3 rounded-xl bg-card card-shadow hover:scale-105 transition-transform touch-target text-xl" aria-label="Ayarlar">
          ⚙️
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">⚙️ Ayarlar</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 py-2">
          <SettingRow icon="🔊" label="Ses" checked={settings.soundEnabled} onChange={v => updateSettings({ soundEnabled: v })} />
          <SettingRow icon="⏱️" label="Süre" checked={settings.timerEnabled} onChange={v => updateSettings({ timerEnabled: v })} />
          
          {settings.timerEnabled && (
            <div className="space-y-2 pl-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Süre: {formatDuration(settings.timerDuration)}</span>
                <span className="text-xs text-muted-foreground">10 sn – 5 dk</span>
              </div>
              <Slider
                value={[settings.timerDuration]}
                onValueChange={([v]) => updateSettings({ timerDuration: v })}
                min={10}
                max={300}
                step={5}
              />
            </div>
          )}
          
          <SettingRow icon="🖥️" label="Sunum Modu" checked={settings.presentationMode} onChange={v => updateSettings({ presentationMode: v })} />
          <SettingRow icon="🌙" label="Karanlık Mod" checked={settings.darkMode} onChange={v => updateSettings({ darkMode: v })} />

          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-3">
              ℹ️ Zor modda süre otomatik kapalıdır.
            </p>
            {!confirmReset ? (
              <Button variant="destructive" className="w-full rounded-xl touch-target" onClick={() => setConfirmReset(true)}>
                🔄 İstatistikleri Sıfırla
              </Button>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-destructive font-medium text-center">Tüm veriler silinecek. Emin misiniz?</p>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setConfirmReset(false)}>İptal</Button>
                  <Button variant="destructive" className="flex-1 rounded-xl" onClick={() => { resetStats(); setConfirmReset(false); }}>Sıfırla</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SettingRow({ icon, label, checked, onChange }: { icon: string; label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-base font-medium text-card-foreground">{icon} {label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
