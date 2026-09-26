'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Pencil, X } from 'lucide-react';
import { updateContactSettings } from '@/app/admin/(dashboard)/settings/actions';
import { useAuth } from '@/lib/hooks/useAuth';
import { resolveContactSettings } from '@/lib/contact-settings';
import type { Database } from '@/lib/types/database';

type ContactSettingsProps = {
  settings: Database['public']['Tables']['site_settings']['Row'] | null;
};

export default function ContactSettings({ settings }: ContactSettingsProps) {
  const router = useRouter();
  const { isSuperAdmin } = useAuth();
  const initialValues = resolveContactSettings(settings);
  const [values, setValues] = useState(initialValues);
  const [savedValues, setSavedValues] = useState(initialValues);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const isReadOnly = !isSuperAdmin || !isEditing || isPending;

  const updateValue = (key: keyof typeof values, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleCancel = () => {
    setValues(savedValues);
    setIsEditing(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSuperAdmin || !isEditing) return;

    setIsPending(true);
    const result = await updateContactSettings(new FormData(event.currentTarget));
    setIsPending(false);

    if (result.success) {
      setSavedValues(values);
      setIsEditing(false);
      toast.success('Pengaturan kontak berhasil disimpan');
      router.refresh();
    } else {
      toast.error(result.error || 'Terjadi kesalahan');
    }
  };

  const fieldClassName = 'read-only:cursor-default read-only:bg-gray-50 read-only:text-gray-600';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengaturan Kontak & Media Sosial</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="wa_number">Nomor WhatsApp Utama</Label>
              <Input id="wa_number" name="wa_number" value={values.waNumber} onChange={(event) => updateValue('waNumber', event.target.value)} readOnly={isReadOnly} className={fieldClassName} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_phone">Nomor Telepon Kantor</Label>
              <Input id="company_phone" name="company_phone" value={values.companyPhone} onChange={(event) => updateValue('companyPhone', event.target.value)} readOnly={isReadOnly} className={fieldClassName} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="wa_greeting_template">Template Pesan Greeting WhatsApp</Label>
              <Textarea id="wa_greeting_template" name="wa_greeting_template" value={values.waGreetingTemplate} onChange={(event) => updateValue('waGreetingTemplate', event.target.value)} readOnly={isReadOnly} rows={3} className={`${fieldClassName} resize-none`} />
              <p className="text-xs text-gray-500">Gunakan {'{nama}'} dan {'{proyek}'} sebagai variabel.</p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="company_email">Email Perusahaan</Label>
              <Input id="company_email" name="company_email" type="email" value={values.companyEmail} onChange={(event) => updateValue('companyEmail', event.target.value)} readOnly={isReadOnly} className={fieldClassName} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="company_address">Alamat Kantor</Label>
              <Textarea id="company_address" name="company_address" value={values.companyAddress} onChange={(event) => updateValue('companyAddress', event.target.value)} readOnly={isReadOnly} rows={3} className={`${fieldClassName} resize-none`} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram_url">Instagram URL</Label>
              <Input id="instagram_url" name="instagram_url" type="url" value={values.instagramUrl} onChange={(event) => updateValue('instagramUrl', event.target.value)} readOnly={isReadOnly} className={fieldClassName} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tiktok_url">TikTok URL</Label>
              <Input id="tiktok_url" name="tiktok_url" type="url" value={values.tiktokUrl} onChange={(event) => updateValue('tiktokUrl', event.target.value)} readOnly={isReadOnly} className={fieldClassName} />
            </div>
          </div>

          {isSuperAdmin && !isEditing && (
            <Button type="button" onClick={() => setIsEditing(true)} className="bg-[#1E3A5F] text-white hover:bg-[#294f7d] hover:text-white">
              <Pencil className="mr-2 h-4 w-4" />
              Edit Data Kontak
            </Button>
          )}

          {isSuperAdmin && isEditing && (
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="outline" onClick={handleCancel} disabled={isPending}>
                <X className="mr-2 h-4 w-4" />
                Batal
              </Button>
              <Button type="submit" disabled={isPending} className="bg-[#1E3A5F] text-white hover:bg-[#294f7d] hover:text-white">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan Perubahan
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
