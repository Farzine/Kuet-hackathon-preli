# Banglish to Bengali Transliteration

A repository for training and evaluating a transliteration model that converts **Banglish** (Bengali written in English letters) to **Bengali script**.

## Overview

This project downloads a **Banglish–Bengali** dataset from [Hugging Face](https://huggingface.co/datasets/SKNahin/bengali-transliteration-data) and trains a sequence-to-sequence model (e.g., **mT5**) using the [Hugging Face Transformers](https://github.com/huggingface/transformers) library.

## Dataset

We use the [SKNahin/bengali-transliteration-data](https://huggingface.co/datasets/SKNahin/bengali-transliteration-data) dataset, which contains parallel text pairs:

- **bn**: Bengali text  
- **rm**: Banglish (romanized Bengali)

## Notebook link 

[Click to see Notebook](https://www.kaggle.com/code/mdfarzinehossen/kuet-hackathon-preli-test1)
