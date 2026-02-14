import { cn } from "@/lib/utils";

export const Table = ({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
  <div className="w-full overflow-x-auto rounded-lg">
    <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
  </div>
);

export const TableHeader = (props: React.HTMLAttributes<HTMLTableSectionElement>) => <thead {...props} />;
export const TableBody = (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />;
export const TableRow = ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={cn("border-b border-border/50 last:border-0", className)} {...props} />
);
export const TableHead = ({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={cn("h-10 px-2 py-2 text-left align-middle text-xs font-medium text-muted-foreground sm:px-3 sm:text-sm", className)} {...props} />
);
export const TableCell = ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn("p-2 align-middle text-xs sm:p-3 sm:text-sm", className)} {...props} />
);
