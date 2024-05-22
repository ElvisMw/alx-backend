# Caching System Project
This project explores different caching algorithms and their implementations in Python. We will learn about cache replacement policies such as FIFO, LIFO, LRU, MRU, and LFU. By the end of this project, you will be able to explain these concepts clearly.

## Table of Contents
- [Background Context](#background-context)
- [Resources](#resources)
- [Learning Objectives](#learning-objectives)
- [Requirements](#requirements)
- [Project Structure](#project-structure)
- [Caching Algorithms Implemented](#caching-algorithms-implemented)
- [Usage](#usage)
- [Author](#author)

## Background Context
In this project, we explore different caching algorithms and their implementations. Understanding these algorithms is crucial for optimizing performance in software systems where repeated access to certain data is common.

## Resources
- [Cache replacement policies - FIFO](https://en.wikipedia.org/wiki/Cache_replacement_policies#First_In_First_Out_(FIFO))
- [Cache replacement policies - LIFO](https://en.wikipedia.org/wiki/Cache_replacement_policies#Last_In_First_Out_(LIFO))
- [Cache replacement policies - LRU](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Recently_Used_(LRU))
- [Cache replacement policies - MRU](https://en.wikipedia.org/wiki/Cache_replacement_policies#Most_Recently_Used_(MRU))
- [Cache replacement policies - LFU](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Frequently_Used_(LFU))

## Learning Objectives
- Understand the concept of caching algorithms and their implementations.
- Implement different cache replacement policies.
- Analyze the performance of cache algorithms.

## Requirements
- Python 3.x

## Project Structure
- `cache_system`: The main directory containing the project.
- `cache_system/basic_cache.py`: Implements a basic cache without any caching policies.
- `cache_system/fifo_cache.py`: Implements a cache with a FIFO (First-In-First-Out) caching policy.
- `cache_system/lifo_cache.py`: Implements a cache with a LIFO (Last-In-First-Out) caching policy.
- `cache_system/lru_cache.py`: Implements a cache with an LRU (Least Recently Used) caching policy.
- `cache_system/mru_cache.py`: Implements a cache with an MRU (Most Recently Used) caching policy.
- `cache_system/lfu_cache.py`: Implements a cache with an LFU (Least Frequently Used) caching policy.

## Caching Algorithms Implemented
- Basic Cache
- FIFO Cache
- LIFO Cache
- LRU Cache
- MRU Cache
- LFU Cache