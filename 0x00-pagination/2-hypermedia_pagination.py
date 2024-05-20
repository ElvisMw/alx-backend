#!/usr/bin/env python3
"""
Hypermedia pagination.
"""

import csv
import math
from typing import List, Dict, Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
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


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset"""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]  # Exclude header

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Returns a page of the dataset.

        Arguments:
        page -- the current page number (1-indexed)
        page_size -- the number of items per page

        Returns:
        A list of lists containing the dataset rows for the requested page
        """
        assert type(page) is int and page > 0, \
            "page must be a positive integer"
        assert type(page_size) is int and page_size > 0, \
            "page_size must be a positive integer"

        dataset = self.dataset()
        start_index, end_index = index_range(page, page_size)

        if start_index >= len(dataset):
            return []

        return dataset[start_index:end_index]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """
        Returns a dictionary with pagination metadata and dataset page.

        Arguments:
        page -- the current page number (1-indexed)
        page_size -- the number of items per page

        Returns:
        A dictionary containing pagination information
        """
        data = self.get_page(page, page_size)
        total_pages = math.ceil(len(self.dataset()) / page_size)

        hypermedia = {
            'page_size': len(data),
            'page': page,
            'data': data,
            'next_page': page + 1 if page < total_pages else None,
            'prev_page': page - 1 if page > 1 else None,
            'total_pages': total_pages
        }

        return hypermedia
