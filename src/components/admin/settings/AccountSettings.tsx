'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, Shield, User, Power, Upload } from 'lucide-react';
import { updateProfile, changePassword, createAdminAccount, toggleAdminActive, deleteAdminAccount } from '@/app/admin/(dashboard)/settings/actions';
import { useAuth } from '@/lib/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/lib/types/database';

type AccountSettingsProps = {
  admins: Database['public']['Tables']['admins']['Row'][];
};

export default function AccountSettings({ admins }: AccountSettingsProps) {
  const { admin, isSuperAdmin } = useAuth();
  
  const [profilePending, setProfilePending] = useState(false);
  const [passwordPending, setPasswordPending] = useState(false);
  const [createPending, setCreatePending] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState(admin?.avatar_url || '');

  const supabase = createClient();

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfilePending(true);
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get('full_name') as string;
    
    let finalAvatarUrl = avatarUrl;

    const avatarFile = (formData.get('avatar') as File);
    if (avatarFile && avatarFile.size > 0) {
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${admin?.id}-${Math.random()}.${fileExt}`;
      const { error } = await supabase.storage
        .from('avatars')
        .upload(fileName, avatarFile, { upsert: true });

      if (error) {
        toast.error('Gagal mengupload avatar: ' + error.message);
        setProfilePending(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
      
      finalAvatarUrl = publicUrl;
      setAvatarUrl(publicUrl);
    }

    const res = await updateProfile(fullName, finalAvatarUrl);
    
    setProfilePending(false);
    if (res.success) {
      toast.success('Profil berhasil diubah');
    } else {
      toast.error(res.error || 'Terjadi kesalahan');
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get('current_password') as string;
    const newPassword = formData.get('new_password') as string;
    const confirmPassword = formData.get('confirm_password') as string;

    if (newPassword !== confirmPassword) {
      toast.error('Konfirmasi password tidak cocok');
      return;
    }

    if (newPassword.length < 8 || !/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      toast.error('Password minimal 8 karakter dan harus berisi huruf serta angka');
      return;
    }

    setPasswordPending(true);
    const res = await changePassword(currentPassword, newPassword);
    setPasswordPending(false);

    if (res.success) {
      toast.success('Password berhasil diubah');
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error(res.error || 'Terjadi kesalahan');
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSuperAdmin) return;

    setCreatePending(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const fullName = formData.get('full_name') as string;
    const role = formData.get('role') as 'admin' | 'super_admin';

    const res = await createAdminAccount(email, fullName, role);
    setCreatePending(false);

    if (res.success) {
      toast.success('Akun admin berhasil dibuat');
      setIsDialogOpen(false);
    } else {
      toast.error(res.error || 'Gagal membuat admin (Pastikan API atau Service Role disetup)');
    }
  };

  const handleToggleActive = async (adminId: string, currentStatus: boolean) => {
    if (!isSuperAdmin) return;
    const res = await toggleAdminActive(adminId, !currentStatus);
    if (res.success) {
      toast.success('Status admin berhasil diubah');
    } else {
      toast.error(res.error || 'Terjadi kesalahan');
    }
  };

  const handleDeleteAdmin = async (adminId: string) => {
    if (!isSuperAdmin) return;
    if (!confirm('Yakin ingin menghapus akun admin ini?')) return;

    const res = await deleteAdminAccount(adminId);
    if (res.success) {
      toast.success('Akun admin berhasil dihapus');
    } else {
      toast.error(res.error || 'Terjadi kesalahan');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profil Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  <User className="h-8 w-8 text-slate-400" />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatar" className="cursor-pointer">
                  <div className="flex items-center text-sm text-primary hover:underline">
                    <Upload className="h-4 w-4 mr-2" />
                    Pilih Foto Baru
                  </div>
                </Label>
                <Input id="avatar" name="avatar" type="file" accept="image/*" className="hidden" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_name">Nama Lengkap</Label>
              <Input
                id="full_name"
                name="full_name"
                defaultValue={admin?.full_name || ''}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={admin?.email || ''} disabled />
            </div>

            <Button type="submit" disabled={profilePending} className="bg-[#1E3A5F] text-white hover:bg-[#294f7d] hover:text-white">
              {profilePending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan Profil
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ubah Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current_password">Password Saat Ini</Label>
              <Input id="current_password" name="current_password" type="password" required autoComplete="current-password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new_password">Password Baru</Label>
              <Input
                id="new_password"
                name="new_password"
                type="password"
                required
                autoComplete="new-password"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm_password">Konfirmasi Password Baru</Label>
              <Input
                id="confirm_password"
                name="confirm_password"
                type="password"
                required
                autoComplete="new-password"
              />
            </div>

            <Button type="submit" variant="secondary" disabled={passwordPending} className="bg-[#1E3A5F] text-white hover:bg-[#294f7d] hover:text-white">
              {passwordPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Perbarui Password
            </Button>
          </form>
        </CardContent>
      </Card>

      {isSuperAdmin && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Daftar Akun Admin</CardTitle>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-[#1E3A5F] text-white hover:bg-[#294f7d] hover:text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Admin Baru
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Admin Baru</DialogTitle>
                  <DialogDescription>
                    Akun baru akan dibuat. Anda bisa memberikan password default dan memintanya untuk mengubahnya nanti.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateAdmin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Nama Lengkap</Label>
                    <Input id="full_name" name="full_name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select name="role" defaultValue="admin">
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="super_admin">Super Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={createPending} className="bg-[#1E3A5F] text-white hover:bg-[#294f7d] hover:text-white">
                      {createPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Buat Akun
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="mt-4 rounded-md border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                            {item.avatar_url ? (
                              <img src={item.avatar_url} alt={item.full_name} className="h-full w-full object-cover" />
                            ) : (
                              <User className="h-4 w-4 text-slate-400" />
                            )}
                          </div>
                          <span>{item.full_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>
                        {item.role === 'super_admin' ? (
                          <Badge variant="default" className="bg-[#1E3A5F] text-white hover:bg-[#1E3A5F]">
                            <Shield className="mr-1 h-3 w-3" /> Super Admin
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-gray-600 text-white hover:bg-gray-600">Admin</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.is_active ? 'outline' : 'destructive'} className={item.is_active ? 'text-green-600 border-green-600' : ''}>
                          {item.is_active ? 'Aktif' : 'Nonaktif'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.id !== admin?.id && (
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              title={item.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                              onClick={() => handleToggleActive(item.id, item.is_active)}
                            >
                              <Power className={`h-4 w-4 ${item.is_active ? 'text-red-500' : 'text-green-500'}`} />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              title="Hapus"
                              onClick={() => handleDeleteAdmin(item.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!admins || admins.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                        Tidak ada data admin.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
