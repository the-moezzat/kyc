'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";
import deleteLink from "../_utils/delete-link";
import { KYCLinks } from "./columns";
import { useQueryClient } from "react-query";

export default function DeleteLink({link}: {link: KYCLinks}) {

    const queryClient = useQueryClient();

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={'ghost'}
            className={
              ' font-medium text-base text-red-600 hover:text-red-700 hover:bg-red-100'
            }
            size={'icon'}
          >
            <Trash2 size={20} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              link and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteLink(link.id);
                queryClient.invalidateQueries('links');
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

}