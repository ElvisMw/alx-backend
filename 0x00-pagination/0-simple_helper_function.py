#!/usr/bin/env python3
"""
Simple helper function for pagination.
"""


def index_range(page: int, page_size: int) -> tuple:
    """
    Returns a tuple of size two containing a start index and an end index.

    Arguments:
    page -- the current page number (1-indexed)
    page_size -- the number of items per page

    Returns:
    A tuple containing the start index and the end index
    """
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return (start_index, end_index)
