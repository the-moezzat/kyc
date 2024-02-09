'use client';
import React from 'react';
import {Pen, Plus} from "lucide-react";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import { KYCLinks } from './columns';
import { useQueryClient } from 'react-query';
import editLink from '../_utils/edit-link';
import { toast } from 'sonner';

function EditLink({ link }: { link: KYCLinks }) {
    const [linkName, setLinkName] = React.useState<string>(link.name || "");
    const queryClient = useQueryClient();

    const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <> 
      <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
        <DialogTrigger asChild>
          <Button size={'icon'} variant={'ghost'}>
            <Pen size={18} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit link</DialogTitle>
            <DialogDescription>Edit the name of the link</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" value={linkName} onChange={(e) => setLinkName(e.target.value)} />
            </div>
            <Button type="submit" size="sm" className="px-3" onClick={async () => {
                setDialogOpen(false);
                const notification = toast.loading('Updating link...');
                const data = await editLink({ id: link.id, name: linkName });
                console.log(data);
                queryClient.invalidateQueries('links');
                toast.success('Link updated successfully', {id: notification});
            }}>
              <span className="">Confirm</span>
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
    </>
  );
}

export default EditLink;