SELECT meta_Toys_and_Games.*, consolidated_features.top_feature
FROM meta_Toys_and_Games
INNER JOIN consolidated_features ON meta_Toys_and_Games.asin = consolidated_features.asin
