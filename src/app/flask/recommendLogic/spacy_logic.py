from string import punctuation

IGNORED_LEMMAS = ['-PRON-', 'PRON', 'i']
IGNORED_POS = ['PUNCT', 'DET']
MAX_FEATURES_PER_REVIEW = 10

def check_embedded_punctuation(input_str):
    """ Check for 2 sequential punctuation characters in a string """
    from string import punctuation

    punct_count = 0

    for char in input_str:
        if char in punctuation:
            punct_count += 1
            if punct_count == 2:
                return True
        else:
            punct_count = 0

    return False


def get_lemmatized_chunk(chunk):
    """ Filter a noun chunk to exclude IGNORED_LEMMAS and return the remaining text and a computed word vector. """
    processed_text = []
    vector = np.zeros(300)
    stop_count = 0
    non_stop_count = 0
    doc = chunk
    for token in doc:
        if (token.lemma_ not in IGNORED_LEMMAS) and (token.pos_ not in IGNORED_POS):
            this_text = token.text.strip()

            # check if this token contains 2 or more sequential punctuation characters
            if check_embedded_punctuation(this_text):
                stop_count += 1
                continue
            else:
                non_stop_count += 1
                vector = vector + token.vector

            #if this_text != token.text:
            #    processed_text.append(this_text)
            #else:
            processed_text.append(token.norm_.lower())

    if (non_stop_count > 0) and (stop_count > 0):
        vector = np.divide(vector, non_stop_count)

    return " ".join(processed_text), vector


def get_vectors(text, nlp):
    """ <generator> Get embedding word vectors from a given text object.
    Args
    ----------
    text (string)            text to be parsed, tokenized, and vectorized
    nlp (spaCy pipeline)     pipeline to use for processing the input text

    Generates:
    ----------
    processed text (string)
    phrase vector (numpy.ndarray)
    """
    # first, strip out the stop words and lowercase the words
    text = ' '.join([word.lower() for word in text.split() if not word in stopWords])

    doc = nlp(text)
    #####
    # Next, iterate through the sentences and within those the noun chunks.
    # These noun chunks will be lemmatized and collected as potential features.
    #####

    collected_terms = []
    term_vector_map = {}

    for sent in doc.sents:
        for chunk in sent.noun_chunks:
            #yield chunk.text, chunk.vector
            lemmatized_text, vect = get_lemmatized_chunk(chunk)
            if len(lemmatized_text) >0:
                collected_terms.append(lemmatized_text)
                term_vector_map[lemmatized_text] = vect

    term_rank = Counter(collected_terms)

    for ranked_term in term_rank.most_common(MAX_FEATURES_PER_REVIEW):
        term = ranked_term[0]
        yield term, term_vector_map[term]

def get_attribute_features(title, description, nlp):
    """ <generator> Get text features from a given product's title and description, in the same manner as for
    review text where features are the result of clustering

    Args
    ----------
    title (string)          text to be parsed, tokenized, and vectorized
    description (string)          text to be parsed, tokenized, and vectorized
    nlp (spaCy pipeline)    pipeline to use for processing the input text

    Generates:
    ----------
    processed text (string)
    phrase vector (numpy.ndarray)
    """

    if (title is not None) and (len(title)>0):
        for term, term_vector in get_vectors(title, nlp):
            yield term, term_vector

    if (description is not None) and (len(description)>0):
        for term, term_vector in get_vectors(description, nlp):
            yield term, term_vector
