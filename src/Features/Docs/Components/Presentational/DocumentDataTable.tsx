import React, {useState, useEffect, useRef} from 'react';
import {format} from 'date-fns';
import {
    ArrowDownWideNarrow,
    ArrowUpNarrowWide,
    EllipsisVertical,
    Search, X,
    Check, Filter, Download, Loader2, Copy
} from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {toast} from "sonner";

// Document interface definition
interface Document {
    docId: string;
    issuer: string;
    recipient: string;
    createdAt: string;
    updatedAt: string;
}

// Component props interface
interface DocumentsTableProps {
    documents: Document[];
    onDownload: (docId: string) => Promise<void>;
    isDownloading?: boolean;
}

// Filter option type
type FilterOption = {
    value: string;
    label: string;
};

export const DocumentsTable: React.FC<DocumentsTableProps> = ({
                                                                  documents: initialDocuments,
                                                                  onDownload,
                                                                  isDownloading = false
                                                              }) => {
    const [documents, setDocuments] = useState<Document[]>(initialDocuments);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterColumns, setFilterColumns] = useState<string[]>([]);
    const [sortColumn, setSortColumn] = useState<keyof Document | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [scrollHeight, setScrollHeight] = useState<number>(500);
    const [open, setOpen] = useState(false);
    const [downloadingDocId, setDownloadingDocId] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const badgesContainerRef = useRef<HTMLDivElement>(null);

    const filterOptions: FilterOption[] = [
        {value: 'docId', label: 'Document ID'},
        {value: 'issuer', label: 'Issuer'},
        {value: 'recipient', label: 'Recipient'},
        {value: 'createdAt', label: 'Created At'},
        {value: 'updatedAt', label: 'Updated At'}
    ];

    // Update documents when initialDocuments prop changes
    useEffect(() => {
        setDocuments(initialDocuments);
    }, [initialDocuments]);

    // Calculate dynamic height for scroll area
    useEffect(() => {
        const updateHeight = () => {
            if (containerRef.current) {
                const containerTop = containerRef.current.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                const availableHeight = windowHeight - containerTop - 40;
                setScrollHeight(Math.max(300, availableHeight));
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    // Get filter column display name
    const getColumnDisplayName = (columnKey: string): string => {
        const option = filterOptions.find(opt => opt.value === columnKey);
        return option ? option.label : columnKey;
    };

    // Handle document download
    const handleDownload = async (docId: string) => {
        setDownloadingDocId(docId);
        try {
            await onDownload(docId);
        } finally {
            setDownloadingDocId(null);
        }
    };

    // Handle search
    const handleSearch = (term: string) => {
        setSearchTerm(term);
        if (!term.trim()) {
            setDocuments(initialDocuments);
            return;
        }

        const filtered = initialDocuments.filter(doc => {
            if (filterColumns.length === 0) {
                // Search across all columns
                return Object.values(doc).some(
                    value => value.toString().toLowerCase().includes(term.toLowerCase())
                );
            } else {
                // Search only in selected columns
                return filterColumns.some(column => {
                    const value = doc[column as keyof Document];
                    return value.toString().toLowerCase().includes(term.toLowerCase());
                });
            }
        });
        setDocuments(filtered);
    };

    // Handle sort
    const handleSort = (column: keyof Document) => {
        const isAsc = sortColumn === column && sortDirection === 'asc';
        setSortDirection(isAsc ? 'desc' : 'asc');
        setSortColumn(column);

        const sorted = [...documents].sort((a, b) => {
            const valueA = a[column].toString().toLowerCase();
            const valueB = b[column].toString().toLowerCase();

            if (column === 'createdAt' || column === 'updatedAt') {
                const dateA = new Date(a[column]);
                const dateB = new Date(b[column]);
                return isAsc ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
            }

            if (isAsc) {
                return valueB.localeCompare(valueA);
            } else {
                return valueA.localeCompare(valueB);
            }
        });

        setDocuments(sorted);
    };

    // Toggle filter column
    const toggleFilterColumn = (columnValue: string) => {
        setFilterColumns(prev => {
            if (prev.includes(columnValue)) {
                return prev.filter(col => col !== columnValue);
            } else {
                return [...prev, columnValue];
            }
        });

        // Re-apply search with updated filters
        if (searchTerm) {
            setTimeout(() => handleSearch(searchTerm), 0);
        }
    };

    // Remove a single filter without rerendering the whole component
    const removeFilter = (columnValue: string, e: React.MouseEvent) => {
        // Prevent event bubbling to parent elements
        e.stopPropagation();

        // Update filter columns state
        const newFilterColumns = filterColumns.filter(col => col !== columnValue);
        setFilterColumns(newFilterColumns);

        // Re-apply search with updated filters
        if (searchTerm) {
            handleSearch(searchTerm);
        }
    };

    // Clear all filters
    const clearAllFilters = () => {
        setFilterColumns([]);

        // Re-apply search with cleared filters
        if (searchTerm) {
            setTimeout(() => handleSearch(searchTerm), 0);
        }
    };

    // Render sort indicator
    const renderSortIndicator = (column: keyof Document) => {
        if (sortColumn !== column) return null;
        return sortDirection === 'asc' ? <ArrowUpNarrowWide size={18} strokeWidth={1.75}/> :
            <ArrowDownWideNarrow size={18} strokeWidth={1.75}/>;
    };

    // Adjust input padding based on badges width
    useEffect(() => {
        if (searchInputRef.current && badgesContainerRef.current) {
            const badgesWidth = badgesContainerRef.current.scrollWidth;
            if (badgesWidth > 0) {
                // Ensure there's enough space for text plus badges
                searchInputRef.current.style.paddingRight = `${badgesWidth + 16}px`;
            } else {
                searchInputRef.current.style.paddingRight = '12px';
            }
        }
    }, [filterColumns]);

    return (
        <div className="space-y-4" ref={containerRef}>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="relative w-full">
                        <div className="relative flex items-center">
                            <Search
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"/>
                            <Input
                                ref={searchInputRef}
                                placeholder="Search documents..."
                                className="pl-8 pr-3 shadow-none overflow-hidden w-full"
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            {filterColumns.length > 0 && (
                                <div
                                    ref={badgesContainerRef}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1 max-w-[70%] overflow-x-auto no-scrollbar"
                                >
                                    {filterColumns.map(col => (
                                        <Badge
                                            key={col}
                                            className="cursor-pointer flex items-center gap-1 px-2 py-0.5 text-xs whitespace-nowrap bg-[#D0E6FD] text-accent-foreground select-none"
                                            variant="secondary"
                                            onClick={(e) => {
                                                removeFilter(col, e)
                                            }}
                                        >
                                            {getColumnDisplayName(col)}
                                            <X
                                                size={12}
                                                className="cursor-pointer"
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button size="sm"
                                    className="shadow-none bg-background text-accent-foreground border border-primary">
                                <Filter/>
                                <span>Filter</span>
                                {filterColumns.length > 0 && (
                                    <Badge className="ml-2 px-1.5 py-0.5 h-5">{filterColumns.length}</Badge>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-0" align="start">
                            <Command>
                                <CommandInput placeholder="Search columns..."/>
                                <CommandList>
                                    <CommandEmpty>No columns found.</CommandEmpty>
                                    <CommandGroup>
                                        {filterOptions.map((option) => (
                                            <CommandItem
                                                key={option.value}
                                                onSelect={() => toggleFilterColumn(option.value)}
                                                className="flex items-center"
                                            >
                                                <div className={cn(
                                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                    filterColumns.includes(option.value) ? "bg-primary text-primary-foreground" : "opacity-50"
                                                )}>
                                                    {filterColumns.includes(option.value) &&
                                                        <Check className="h-3 w-3"/>}
                                                </div>
                                                <span>{option.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                    {filterColumns.length > 0 && (
                                        <div className="border-t p-2">
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-center text-sm"
                                                onClick={clearAllFilters}
                                            >
                                                Clear all filters
                                            </Button>
                                        </div>
                                    )}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <ScrollArea className={`rounded-md border`} style={{height: `${scrollHeight}px`}}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('docId')}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <span>Document ID</span> {renderSortIndicator('docId')}
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('issuer')}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <span>Issuer</span> {renderSortIndicator('issuer')}
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('recipient')}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <span>Recipient</span> {renderSortIndicator('recipient')}
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('createdAt')}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <span>Created At</span> {renderSortIndicator('createdAt')}
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => handleSort('updatedAt')}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <span>Updated At</span> {renderSortIndicator('updatedAt')}
                                </div>
                            </TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {documents.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                    No documents found
                                </TableCell>
                            </TableRow>
                        ) : (
                            documents.map((doc) => (
                                <TableRow key={doc.docId}>
                                    <TableCell className="font-medium flex items-center justify-between">
                                        {doc.docId}
                                        <Button size="icon" variant="ghost"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(doc.docId)
                                                    toast.info("Document ID copied to clipboard")
                                                }
                                                }>
                                            <Copy/>
                                        </Button>
                                    </TableCell>
                                    {doc.issuer == doc.recipient ?
                                        (
                                            <TableCell colSpan={2}><Badge className="w-full  bg-[#D0E6FD] text-accent-foreground ">Self Issued </Badge></TableCell>
                                        ) : (<>
                                            <TableCell>{doc.issuer.length > 15 ? `${doc.issuer.substring(0, 15)}...` : doc.issuer}</TableCell>
                                            <TableCell>{doc.recipient.length > 15 ? `${doc.recipient.substring(0, 15)}...` : doc.recipient}</TableCell>
                                        </>)
                                    }
                                    <TableCell>
                                        {format(new Date(doc.createdAt), 'PPp')}
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(doc.updatedAt), 'PPp')}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <EllipsisVertical/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    className="items-center justify-between font-semibold"
                                                    onClick={() => handleDownload(doc.docId)}
                                                    disabled={isDownloading || downloadingDocId === doc.docId}
                                                >
                                                    <span className="flex items-center">
                                                        {downloadingDocId === doc.docId ? (
                                                            <Loader2 className="h-4 w-4 mr-2 animate-spin"/>
                                                        ) : (
                                                            <Download className="h-4 w-4 mr-2"/>
                                                        )}
                                                        Download Document
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    );
};