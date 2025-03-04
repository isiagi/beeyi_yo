/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Pagination = ({ currentPage, totalPages, onPageChange }: any) => (
  <div className="flex justify-between items-center">
    <Button
      variant="outline"
      onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      disabled={currentPage === 1}
    >
      <ChevronLeft className="h-4 w-4 mr-2" />
      Previous
    </Button>
    <span className="text-sm text-muted-foreground">
      Page {currentPage} of {totalPages}
    </span>
    <Button
      variant="outline"
      onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      disabled={currentPage === totalPages}
    >
      Next
      <ChevronRight className="h-4 w-4 ml-2" />
    </Button>
  </div>
);

export default Pagination;
