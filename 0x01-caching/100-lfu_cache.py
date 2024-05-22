#!/usr/bin/env python3
""" LFUCache module """
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """ LFUCache defines:
      - a caching system with LFU eviction policy
    """
    def __init__(self):
        """ Initialize """
        super().__init__()
        self.usage_count = {}
        self.order = []

    def put(self, key, item):
        """ Add an item in the cache """
        if key is not None and item is not None:
            if key in self.cache_data:
                self.usage_count[key] += 1
                self.order.remove(key)
            else:
                self.usage_count[key] = 1
                if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                    lfu_keys = [k for k, v in self.usage_count.items() if v == min(self.usage_count.values())]
                    if len(lfu_keys) > 1:
                        lru_lfu = [k for k in self.order if k in lfu_keys][0]
                    else:
                        lru_lfu = lfu_keys[0]
                    self.order.remove(lru_lfu)
                    print(f"DISCARD: {lru_lfu}")
                    del self.cache_data[lru_lfu]
                    del self.usage_count[lru_lfu]
            self.cache_data[key] = item
            self.order.append(key)

    def get(self, key):
        """ Get an item by key """
        if key in self.cache_data:
            self.usage_count[key] += 1
            self.order.remove(key)
            self.order.append(key)
            return self.cache_data[key]
        return None
