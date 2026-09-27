'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { updateIntegrationSettings } from '@/app/admin/(dashboard)/settings/actions';
import { useAuth } from '@/lib/hooks/useAuth';
import type { Database } from '@/lib/types/database';

type IntegrationSettingsProps = {
  settings: Database['public']['Tables']['site_settings']['Row'] | null;
};

export default function IntegrationSettings({ settings }: IntegrationSettingsProps) {
  const [isPending, setIsPending] = useState(false);
  const { isSuperAdmin } = useAuth();
  
  const [gaId, setGaId] = useState(settings?.ga_measurement_id || '');
  const [pixelId, setPixelId] = useState(settings?.meta_pixel_id || '');
  const [showGa, setShowGa] = useState(false);
  const [showPixel, setShowPixel] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSuperAdmin) return;
    
    setIsPending(true);
    const res = await updateIntegrationSettings(gaId, pixelId);
    
    setIsPending(false);
    if (res.success) {
      toast.success('Konfigurasi integrasi berhasil disimpan');
    } else {
      toast.error(res.error || 'Terjadi kesalahan');
    }
  };

  const maskId = (id: string) => {
    if (!id || id.length < 5) return id;
    const firstPart = id.substring(0, 4);
    return firstPart + '••••••';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrasi Pihak Ketiga</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ga_measurement_id">Google Analytics Measurement ID</Label>
              <div className="relative">
                <Input
                  id="ga_measurement_id"
                  placeholder="G-XXXXXXXXXX"
                  value={showGa ? gaId : maskId(gaId)}
                  onChange={(e) => {
                    if (showGa) setGaId(e.target.value);
                  }}
                  readOnly={!showGa}
                  disabled={!isSuperAdmin}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowGa(!showGa)}
                  title={showGa ? 'Sembunyikan' : 'Tampilkan'}
                >
                  {showGa ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta_pixel_id">Meta Pixel ID</Label>
              <div className="relative">
                <Input
                  id="meta_pixel_id"
                  placeholder="XXXXXXXXXXXXXXX"
                  value={showPixel ? pixelId : maskId(pixelId)}
                  onChange={(e) => {
                    if (showPixel) setPixelId(e.target.value);
                  }}
                  readOnly={!showPixel}
                  disabled={!isSuperAdmin}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPixel(!showPixel)}
                  title={showPixel ? 'Sembunyikan' : 'Tampilkan'}
                >
                  {showPixel ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {isSuperAdmin && (
            <Button type="submit" disabled={isPending} className="bg-[#1E3A5F] text-white hover:bg-[#294f7d] hover:text-white">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan Konfigurasi Integrasi
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
