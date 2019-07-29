#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import gzip
import time
import os, sys, time
import collections
from collections import Counter
import random
import itertools
import numpy as np
import json


# In[2]:


#Read the MF features
with open('/home/ec2-user/capstone_angular/src/app/flask/recommendLogic/neighbors5.json', 'r') as f_:
     data = json.load(f_)
#Convert to a pandas df with item and similar items
df = pd.DataFrame(data.items(), columns=['item', 'similar'])


# In[3]:


#Function to read product metadata
def parse(path):
  g = gzip.open(path, 'rb')
  for l in g:
    yield eval(l)

def getDF(path):
  i = 0
  df = {}
  for d in parse(path):
    df[i] = d
    i += 1
  return pd.DataFrame.from_dict(df, orient='index')


# In[4]:


#Read the Metadata
dfMeta = pd.read_csv('/home/ec2-user/capstone_angular/src/app/flask/recommendLogic/meta_Toys_and_Games6.csv')

#old code for the bigger metadata file
# dfMeta = getDF('/home/ec2-user/capstone_angular/src/app/flask/recommendLogic/meta_Toys_and_Games.json.gz')
# dfMeta['subCateg'] = dfMeta['categories'].map(lambda x:x[0][1] if len(x[0]) > 1 else x[0][0])


# In[5]:


#Read the text features based on reviews
dfTextF = pd.read_csv('/home/ec2-user/capstone_angular/src/app/flask/recommendLogic/product_review_features.csv')

#old files before we created the tfidf features
# dfTextF = pd.read_csv('/home/ec2-user/capstone_angular/src/app/flask/recommendLogic/product_features.tar.gz',compression = 'gzip')
# dfTextF.rename(columns = {'product_features.0.csv':'asin'," 'note'":'feature'}, inplace = True)


# In[6]:


#Read the text features based on title and description

productTitleDescFeatures = pd.read_csv('/home/ec2-user/capstone_angular/src/app/flask/recommendLogic/product_attribute_features.csv')

#old files before we created the tfidf features
# product_attribute_features_filepath = '/home/ec2-user/capstone_angular/src/app/flask/recommendLogic/product_attribute_features.harvested.0.csv'
# with open('/home/ec2-user/capstone_angular/src/app/flask/recommendLogic/product_attribute_features.harvested.0.csv', mode='r') as in_f:
#    productTitleDescFeatures = pd.read_csv(in_f, names=['asin','overall','feature'])


# In[7]:


def findSimilarsText(userItems):

    userCategories = np.unique(dfMeta[dfMeta['asin'].isin(userItems)]['subCateg'].reset_index(drop = True))
#     print(userCategories)

    similarItems = []

    #Find all items with at least one feature in common with the user selected item features
    for item in userItems:
        reviewFeatures = dfTextF[dfTextF['asin'] == item]['feature'].to_list()
#         print(reviewFeatures)
        for feature in reviewFeatures:
            simProds = dfTextF[dfTextF['feature'] == feature]['asin'].to_list()
#             print(feature,len(simProds))
            for prod in simProds:
                if prod != item:
                    similarItems.append(prod)


        titleDescFeatures = productTitleDescFeatures[productTitleDescFeatures['asin'] == item]['feature'].to_list()
#         print(titleDescFeatures)
        for feature in titleDescFeatures:
            simProds = productTitleDescFeatures[productTitleDescFeatures['feature'] == feature]['asin'].to_list()
#             print(feature,len(simProds))
            for prod in simProds:
                if prod != item:
                    similarItems.append(prod)

    temp = dfMeta[dfMeta['asin'].isin(similarItems)]
#     print('subCategories',Counter(temp['subCateg']))
    selectSimilarItems = temp[temp['subCateg'].isin(userCategories)]['asin'].reset_index(drop = True)
    a = Counter(selectSimilarItems) #Items limited to same subcategory as user picked items
    b = Counter(similarItems) #All similar items irrespective of category
#     print('Number of items before and after limiting categories',len(b),len(a))

    recommendedItems = []
    for asin,count in a.most_common(4):
        recommendedItems.append(asin)
    for asin,count in b.most_common(3):
        recommendedItems.append(asin)

    return recommendedItems


# In[8]:


#Function to read the similar items to all items in userItems (list of asins picked by user, and output the most common asins within those)
def findSimilarsMF(userItems):
    userCategories = np.unique(dfMeta[dfMeta['asin'].isin(userItems)]['subCateg'].reset_index(drop = True))
    similarItems = []

    similarItemsDf = df[df['item'].isin(userItems)]['similar'].reset_index(drop = True)
#     similarItems = [item for sublist in similarItemsDf for item in sublist]
    for i in range(similarItemsDf.shape[0]):
        for item in similarItemsDf[i]:
            similarItems.append(item)
#     print(len(similarItems),similarItems)

    for uItem in userItems:
        similarItems = [x for x in similarItems if x != uItem]

    temp = dfMeta[dfMeta['asin'].isin(similarItems)]
#     print('subCategories',Counter(temp['subCateg']))
    selectSimilarItems = temp[temp['subCateg'].isin(userCategories)]['asin'].reset_index(drop = True)

    a = Counter(selectSimilarItems) #Items limited to same subcategory as user picked items
    b = Counter(similarItems) #All similar items irrespective of category

    recommendedItems = []
    for asin,count in a.most_common(4):
        recommendedItems.append(asin)
    for asin,count in b.most_common(3):
        recommendedItems.append(asin)

    return recommendedItems


# In[9]:


def findSimilarsTextOnly(features):

    similarItems = []

    #Find all items with at least one feature in common with the user selected text features
    for feature in features:
        simProds = dfTextF[dfTextF['feature'] == feature]['asin'].to_list()
        print(feature,len(simProds))
        for prod in simProds:
            similarItems.append(prod)


    for feature in features:
        feature = " " + feature
        simProds = productTitleDescFeatures[productTitleDescFeatures['feature'] == feature]['asin'].to_list()
        print(feature,len(simProds))
        for prod in simProds:
            similarItems.append(prod)

    b = Counter(similarItems)

    recommendedItems = []
    for asin,count in b.most_common(7):
        recommendedItems.append(asin)

    return recommendedItems


# In[37]:


def return_recommendations(featureList,productList):
    print(featureList)
    print(productList)
    productAsins = dfMeta[dfMeta['title'].isin(productList)]['asin'].to_list()
    recommendedItems = {}
    textProds = findSimilarsText(productAsins)
    MFProds = findSimilarsMF(productAsins)
    featureProds = findSimilarsTextOnly(featureList)
    recommendedItems['textProds'] = textProds
    recommendedItems['MFProds'] = MFProds
    recommendedItems['featureProds'] = featureProds
    return recommendedItems


# In[39]:


# sample test case
# return_recommendations([' chalkboard',' everyone'],productList)


