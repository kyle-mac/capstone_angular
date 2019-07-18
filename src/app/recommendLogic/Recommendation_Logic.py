#!/usr/bin/env python
# coding: utf-8

# ## Code to read the files

# In[1]:


import pandas as pd
import numpy as np
import gzip
import time
import os, sys, time
import collections
from collections import Counter
import json
import random


# In[2]:


#Read product metadata
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

dfMeta = getDF('meta_Toys_and_Games.json.gz')
#Pull out the subcategory for the products from the categories field.
dfMeta['subCateg'] = dfMeta['categories'].map(lambda x:x[0][1] if len(x[0]) > 1 else x[0][0])


# In[4]:


#Read text based product features
dfTextF = pd.read_csv('product_features.tar.gz',compression = 'gzip')
dfTextF.rename(columns = {'product_features.0.csv':'asin'," 'note'":'feature'}, inplace = True)


# In[5]:


#Read title and description based features
product_attribute_features_filepath = './product_attribute_features.harvested.0.csv'
with open('product_attribute_features.harvested.0.csv', mode='r') as in_f:
   productTitleDescFeatures = pd.read_csv(in_f, names=['asin','overall','feature'])
   print('File {} contains {} total product features.'.format(product_attribute_features_filepath,
                                                              len(productTitleDescFeatures)))
   print(productTitleDescFeatures[:10])


# In[6]:


#Read MF based similar products
with open('neighbors5.json', 'r') as f_:
     data = json.load(f_)
df = pd.DataFrame(data.items(), columns=['item', 'similar'])


# In[7]:


#Code to get the recommended items given a list of user items asins, based on text features of the items.
def findSimilarsText(userItems): 
    
    userCategories = np.unique(dfMeta[dfMeta['asin'].isin(userItems)]['subCateg'].reset_index(drop = True))
    print(userCategories)
    
    similarItems = []
    
    #Find all items with at least one feature in common with the user selected item features
    for item in userItems:
        reviewFeatures = dfTextF[dfTextF['asin'] == item]['feature'].to_list()
#         print(reviewFeatures)
        for feature in reviewFeatures:
            simProds = dfTextF[dfTextF['feature'] == feature]['asin'].to_list()
            print(feature,len(simProds))
            for prod in simProds:
                if prod != item:
                    similarItems.append(prod)


        titleDescFeatures = productTitleDescFeatures[productTitleDescFeatures['asin'] == item]['feature'].to_list()
        for feature in titleDescFeatures:
            simProds = productTitleDescFeatures[productTitleDescFeatures['feature'] == feature]['asin'].to_list()
            print(feature,len(simProds))
            for prod in simProds:
                if prod != item:
                    similarItems.append(prod)
                
    temp = dfMeta[dfMeta['asin'].isin(similarItems)]
    print('subCategories',Counter(temp['subCateg']))
    selectSimilarItems = temp[temp['subCateg'].isin(userCategories)]['asin'].reset_index(drop = True)
    a = Counter(selectSimilarItems) #Items limited to same subcategory as user picked items
    b = Counter(similarItems) #All similar items irrespective of category
    print('Number of items before and after limiting categories',len(b),len(a))
    
    recommendedItems = []
    for asin,count in a.most_common(4):
        recommendedItems.append(asin)
    for asin,count in b.most_common(2):
        recommendedItems.append(asin)
    
    return recommendedItems  


# In[10]:


#Sample code to call the function

#Picking a couple of random items. In actual engine, the user items would be passed into the function call and this would not be needed

numSelections = 2
prodList = dfTextF.groupby('asin').agg('count').index.to_list()
userItems = random.sample(prodList, numSelections) 
print(userItems)
print("""""")

#Sample function call
simItemsList = findSimilarsText(userItems)
simItemsList


# In[16]:


#Function to create recommendations based on MF-based similarity to all items in userItems (list of asins picked by user)

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
    for asin,count in b.most_common(2):
        recommendedItems.append(asin)
    
    return recommendedItems


# In[20]:


#Sample function call to get MF based recommendations
simItemsListMF = findSimilarsMF(userItems)
simItemsListMF


# ### Code to show the output of recommendations

# In[25]:


import matplotlib.pyplot as plt
get_ipython().run_line_magic('matplotlib', 'inline')
from PIL import Image
import requests
from io import BytesIO

def showImages(images):
    imageswidth = len(images)*4
    fig=plt.figure(figsize=(imageswidth, 8))

    for i in range(0,len(images)):
        response = requests.get(images[i])
        img = Image.open(BytesIO(response.content))
        fig.add_subplot(1, len(images), i+1)
        plt.imshow(img)


# In[27]:


#Pick some user items randomly to find similar products for
numSelections = 2 #This can be varied based on how long we want the user list to be.
prodList = dfTextF.groupby('asin').agg('count').index.to_list()
userItems = random.sample(prodList, numSelections)

#Show user items picked
images = dfMeta[dfMeta['asin'].isin(userItems)]['imUrl'].to_list()
showImages(images)
dfMeta[dfMeta['asin'].isin(userItems)]


# In[26]:


#Find and display similar items using text features
simItemsList = findSimilarsText(userItems)
images = dfMeta[dfMeta['asin'].isin(simItemsList)]['imUrl'].to_list()
showImages(images)
dfMeta[dfMeta['asin'].isin(simItemsList)]


# In[28]:


#Find and display similar items using MF
simItemsListMF = findSimilarsMF(userItems)
images = dfMeta[dfMeta['asin'].isin(simItemsListMF)]['imUrl'].to_list()
showImages(images)
dfMeta[dfMeta['asin'].isin(simItemsListMF)]

