import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination"

interface PaginatorProps {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
    siblings?: number
}

export function Paginator({
                              totalPages,
                              currentPage,
                              onPageChange,
                              siblings = 1,
                          }: PaginatorProps) {
    if (totalPages <= 1) return null

    const startPage = Math.max(1, currentPage - siblings)
    const endPage = Math.min(totalPages, currentPage + siblings)

    const pages = []
    for (let page = startPage; page <= endPage; page++) {
        pages.push(page)
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            if (currentPage > 1) onPageChange(currentPage - 1)
                        }}
                    />
                </PaginationItem>
                {startPage > 1 && (
                    <>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    onPageChange(1)
                                }}
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                        {startPage > 2 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                    </>
                )}
                {pages.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            href="#"
                            isActive={page === currentPage}
                            onClick={(e) => {
                                e.preventDefault()
                                onPageChange(page)
                            }}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    onPageChange(totalPages)
                                }}
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            if (currentPage < totalPages)
                                onPageChange(currentPage + 1)
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
