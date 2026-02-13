/**
 * Generic pagination response structure.
 *
 * Represents a standard paginated API response containing
 * a list of items and pagination metadata.
 *
 * @template T - Type of the items being paginated
 */
export interface PaginationResponse<T> {
    /**
     * List of items for the current page.
     */
    data: T[]

    /**
     * Current page number (1-based).
     */
    page: number

    /**
     * Number of items per page.
     */
    pageSize: number

    /**
     * Total number of items available.
     */
    total: number

    /**
     * Total number of pages available.
     */
    totalPages: number
}
