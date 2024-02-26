'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Database } from '@/types/db';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

function AddLink({ company_id }: { company_id: string }) {
  const [linkName, setLinkName] = useState<string>('');
  const supabase = createClientComponentClient<Database>();
  const queryClient = useQueryClient();

  const handleCreateLink = async (name: string) => {
    try {
      await supabase.from('links').insert([{name, company_id, visitors: 0}])
      await queryClient.invalidateQueries('links');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={'flex gap-2'}>
          <Plus size={20} />
          <span>Link</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create link</DialogTitle>
          <DialogDescription>Add the name of the link</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              value={linkName}
              onChange={(e) => setLinkName(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={() => handleCreateLink(linkName, )}
          >
            <span className="">Create</span>
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddLink;
