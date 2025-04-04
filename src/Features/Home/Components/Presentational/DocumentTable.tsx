import React from 'react';

import {format} from 'date-fns';
import {DocumentSearchResponse} from "@/Features/Home/API/documentGetAPI.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {EllipsisVertical} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";

interface DocumentsTableProps {
    documents: DocumentSearchResponse['documents'];
}

export const DocumentsTable: React.FC<DocumentsTableProps> = ({documents}) => {
    return (
        <ScrollArea className="h-175 rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Document ID</TableHead>
                        <TableHead>Issuer</TableHead>
                        <TableHead>Recipient</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Updated At</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {documents.map((doc) => (
                        <TableRow key={doc.docId}>
                            <TableCell className="font-medium">
                                {doc.docId}
                            </TableCell>
                            <TableCell>{doc.issuer}</TableCell>
                            <TableCell>{doc.recipient.substring(0, 10)}...</TableCell>
                            <TableCell>
                                {format(new Date(doc.createdAt), 'PPp')}
                            </TableCell>
                            <TableCell>
                                {format(new Date(doc.updatedAt), 'PPp')}
                            </TableCell>
                            <TableCell>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="shadow-none border-primary" size="icon"
                                                onClick={() => {
                                                }}>
                                            <EllipsisVertical/>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <h4 className="font-medium leading-none">Dimensions</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Set the dimensions for the layer.
                                                </p>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    );
};