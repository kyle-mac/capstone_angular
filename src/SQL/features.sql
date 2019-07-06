SELECT meta_Toys_and_Games.*, product_features.top_feature_exemplar
FROM meta_Toys_and_Games
INNER JOIN product_features ON meta_Toys_and_Games.asin = product_features.asin
