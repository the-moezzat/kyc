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

function EditLink() {
    return (<>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size={'icon'} variant={'ghost'}>
                    <Pen size={18}/>
                        </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit link</DialogTitle>
                        <DialogDescription>
                            Edit the name of the link
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>
                            <Input
                                id="link"
                                defaultValue="Global india"
                                readOnly
                            />
                        </div>
                        <Button type="submit" size="sm" className="px-3">
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

    </>

    );
}

export default EditLink;