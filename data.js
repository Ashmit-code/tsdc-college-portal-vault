// ============================================================
//  DATA FILE — Edit this file to add new subjects/practicals
//  Structure: Array of subject objects, each with practicals
// ============================================================

const subjects = [
  {
    name: "Deep Learning Practicals",
    practicals: [
      {
        title: "Practical 1: McCulloch-Pitts Neuron Model",
        aim: "To implement the McCulloch-Pitts neuron model for basic logic gates (AND, OR, NOT) and understand the fundamentals of artificial neurons.",
        code: `import numpy as np

def mcculloch_pitts(inputs, weights, threshold):
    """McCulloch-Pitts Neuron Model"""
    weighted_sum = np.dot(inputs, weights)
    output = 1 if weighted_sum >= threshold else 0
    return output

# AND Gate
print("=== AND Gate ===")
weights_and = [1, 1]
threshold_and = 2
for x1 in [0, 1]:
    for x2 in [0, 1]:
        result = mcculloch_pitts([x1, x2], weights_and, threshold_and)
        print(f"  Input: ({x1}, {x2}) => Output: {result}")

# OR Gate
print("\\n=== OR Gate ===")
weights_or = [1, 1]
threshold_or = 1
for x1 in [0, 1]:
    for x2 in [0, 1]:
        result = mcculloch_pitts([x1, x2], weights_or, threshold_or)
        print(f"  Input: ({x1}, {x2}) => Output: {result}")

# NOT Gate
print("\\n=== NOT Gate ===")
weights_not = [-1]
threshold_not = 0
for x1 in [0, 1]:
    result = mcculloch_pitts([x1], weights_not, threshold_not)
    print(f"  Input: ({x1}) => Output: {result}")`
      },
      {
        title: "Practical 2: Perceptron Learning Algorithm",
        aim: "To implement the Perceptron Learning Algorithm and train it to classify linearly separable data.",
        code: `import numpy as np
import matplotlib.pyplot as plt

class Perceptron:
    def __init__(self, learning_rate=0.1, epochs=100):
        self.lr = learning_rate
        self.epochs = epochs
        self.weights = None
        self.bias = None

    def activation(self, x):
        return 1 if x >= 0 else 0

    def fit(self, X, y):
        n_features = X.shape[1]
        self.weights = np.zeros(n_features)
        self.bias = 0

        for epoch in range(self.epochs):
            errors = 0
            for idx, x_i in enumerate(X):
                linear_output = np.dot(x_i, self.weights) + self.bias
                y_pred = self.activation(linear_output)
                error = y[idx] - y_pred
                if error != 0:
                    self.weights += self.lr * error * x_i
                    self.bias += self.lr * error
                    errors += 1
            if errors == 0:
                print(f"Converged at epoch {epoch + 1}")
                break

    def predict(self, X):
        return [self.activation(np.dot(x, self.weights) + self.bias) for x in X]

# Training data (AND gate)
X = np.array([[0,0],[0,1],[1,0],[1,1]])
y = np.array([0, 0, 0, 1])

model = Perceptron(learning_rate=0.1, epochs=50)
model.fit(X, y)

predictions = model.predict(X)
print("Predictions:", predictions)
print("Weights:", model.weights)
print("Bias:", model.bias)`
      },
      {
        title: "Practical 3: Feedforward Neural Network with Backpropagation",
        aim: "To implement a feedforward neural network with backpropagation algorithm to solve the XOR problem.",
        code: `import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def sigmoid_derivative(x):
    return x * (1 - x)

# XOR input and output
X = np.array([[0,0],[0,1],[1,0],[1,1]])
y = np.array([[0],[1],[1],[0]])

np.random.seed(42)

# Network architecture: 2 input, 4 hidden, 1 output
weights_input_hidden = np.random.uniform(-1, 1, (2, 4))
bias_hidden = np.zeros((1, 4))
weights_hidden_output = np.random.uniform(-1, 1, (4, 1))
bias_output = np.zeros((1, 1))

learning_rate = 0.5
epochs = 10000

for epoch in range(epochs):
    # Forward pass
    hidden_input = np.dot(X, weights_input_hidden) + bias_hidden
    hidden_output = sigmoid(hidden_input)
    final_input = np.dot(hidden_output, weights_hidden_output) + bias_output
    final_output = sigmoid(final_input)

    # Backpropagation
    error = y - final_output
    d_output = error * sigmoid_derivative(final_output)

    error_hidden = d_output.dot(weights_hidden_output.T)
    d_hidden = error_hidden * sigmoid_derivative(hidden_output)

    # Update weights and biases
    weights_hidden_output += hidden_output.T.dot(d_output) * learning_rate
    bias_output += np.sum(d_output, axis=0, keepdims=True) * learning_rate
    weights_input_hidden += X.T.dot(d_hidden) * learning_rate
    bias_hidden += np.sum(d_hidden, axis=0, keepdims=True) * learning_rate

    if (epoch + 1) % 2000 == 0:
        loss = np.mean(np.square(error))
        print(f"Epoch {epoch+1}, Loss: {loss:.6f}")

print("\\nFinal Predictions:")
for i in range(len(X)):
    print(f"  {X[i]} => {final_output[i][0]:.4f} (expected {y[i][0]})")`
      }
    ]
  },
  {
    name: "Machine Learning Practicals",
    practicals: [
      {
        title: "Practical 1: Linear Regression",
        aim: "To implement simple and multiple linear regression from scratch and using scikit-learn, and evaluate the model using MSE and R² score.",
        code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import train_test_split

# Generate synthetic data
np.random.seed(42)
X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X + np.random.randn(100, 1) * 0.5

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# --- From Scratch ---
X_b = np.c_[np.ones((len(X_train), 1)), X_train]
theta = np.linalg.inv(X_b.T.dot(X_b)).dot(X_b.T).dot(y_train)
print(f"From Scratch — Intercept: {theta[0][0]:.4f}, Slope: {theta[1][0]:.4f}")

# --- Using Scikit-Learn ---
model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

print(f"Sklearn — Intercept: {model.intercept_[0]:.4f}, Slope: {model.coef_[0][0]:.4f}")
print(f"MSE: {mean_squared_error(y_test, y_pred):.4f}")
print(f"R² Score: {r2_score(y_test, y_pred):.4f}")

# Plot
plt.scatter(X_test, y_test, color='blue', label='Actual')
plt.plot(X_test, y_pred, color='red', linewidth=2, label='Predicted')
plt.xlabel('X')
plt.ylabel('y')
plt.title('Linear Regression')
plt.legend()
plt.show()`
      },
      {
        title: "Practical 2: K-Nearest Neighbors (KNN)",
        aim: "To implement the K-Nearest Neighbors classification algorithm and evaluate its performance on the Iris dataset.",
        code: `import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score

# Load Iris dataset
iris = load_iris()
X, y = iris.data, iris.target

# Split and scale
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Find optimal K
accuracies = []
k_range = range(1, 21)
for k in k_range:
    knn = KNeighborsClassifier(n_neighbors=k)
    knn.fit(X_train, y_train)
    accuracies.append(knn.score(X_test, y_test))

best_k = k_range[np.argmax(accuracies)]
print(f"Best K: {best_k} with accuracy: {max(accuracies):.4f}")

# Final model
knn = KNeighborsClassifier(n_neighbors=best_k)
knn.fit(X_train, y_train)
y_pred = knn.predict(X_test)

print("\\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print("\\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=iris.target_names))`
      },
      {
        title: "Practical 3: Decision Tree Classifier",
        aim: "To implement a Decision Tree classifier, visualize the tree structure, and evaluate model performance on a dataset.",
        code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.metrics import accuracy_score, classification_report

# Load dataset
wine = load_wine()
X, y = wine.data, wine.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# Train Decision Tree
dt = DecisionTreeClassifier(
    criterion='gini',
    max_depth=4,
    random_state=42
)
dt.fit(X_train, y_train)

# Predictions
y_pred = dt.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
print("\\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=wine.target_names))

# Feature importance
importances = dt.feature_importances_
indices = np.argsort(importances)[::-1]
print("\\nTop 5 Features:")
for i in range(5):
    print(f"  {wine.feature_names[indices[i]]}: {importances[indices[i]]:.4f}")

# Visualize tree
plt.figure(figsize=(20, 10))
plot_tree(dt, feature_names=wine.feature_names,
          class_names=wine.target_names, filled=True, rounded=True)
plt.title("Decision Tree Visualization")
plt.tight_layout()
plt.show()`
      }
    ]
  },
  {
    name: "Natural Language Processing Practicals",
    practicals: [
      {
        title: "Practical 1: Text Preprocessing & Tokenization",
        aim: "To implement text preprocessing techniques including tokenization, stopword removal, stemming, and lemmatization using NLTK.",
        code: `import nltk
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer
import string

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

text = """Natural Language Processing (NLP) is a subfield of linguistics,
computer science, and artificial intelligence concerned with the interactions
between computers and human language. The goal is to enable computers
to understand, interpret, and generate human languages."""

print("=== Original Text ===")
print(text)

# Sentence Tokenization
sentences = sent_tokenize(text)
print(f"\\n=== Sentences ({len(sentences)}) ===")
for i, s in enumerate(sentences):
    print(f"  {i+1}. {s.strip()}")

# Word Tokenization
tokens = word_tokenize(text.lower())
print(f"\\n=== Tokens ({len(tokens)}) ===")
print(tokens)

# Remove punctuation
tokens_clean = [t for t in tokens if t not in string.punctuation]
print(f"\\n=== After Punctuation Removal ({len(tokens_clean)}) ===")
print(tokens_clean)

# Remove stopwords
stop_words = set(stopwords.words('english'))
tokens_filtered = [t for t in tokens_clean if t not in stop_words]
print(f"\\n=== After Stopword Removal ({len(tokens_filtered)}) ===")
print(tokens_filtered)

# Stemming
stemmer = PorterStemmer()
stemmed = [stemmer.stem(t) for t in tokens_filtered]
print(f"\\n=== After Stemming ===")
print(stemmed)

# Lemmatization
lemmatizer = WordNetLemmatizer()
lemmatized = [lemmatizer.lemmatize(t) for t in tokens_filtered]
print(f"\\n=== After Lemmatization ===")
print(lemmatized)`
      },
      {
        title: "Practical 2: TF-IDF & Bag of Words",
        aim: "To implement Bag of Words and TF-IDF vectorization techniques and understand their application in text representation.",
        code: `from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
import pandas as pd

documents = [
    "Machine learning is a subset of artificial intelligence",
    "Deep learning is a subset of machine learning",
    "Natural language processing uses machine learning techniques",
    "Artificial intelligence encompasses machine learning and deep learning"
]

# --- Bag of Words ---
print("=== Bag of Words ===")
bow_vectorizer = CountVectorizer()
bow_matrix = bow_vectorizer.fit_transform(documents)

bow_df = pd.DataFrame(
    bow_matrix.toarray(),
    columns=bow_vectorizer.get_feature_names_out(),
    index=[f"Doc {i+1}" for i in range(len(documents))]
)
print(bow_df)
print(f"\\nVocabulary size: {len(bow_vectorizer.vocabulary_)}")

# --- TF-IDF ---
print("\\n=== TF-IDF ===")
tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(documents)

tfidf_df = pd.DataFrame(
    tfidf_matrix.toarray().round(4),
    columns=tfidf_vectorizer.get_feature_names_out(),
    index=[f"Doc {i+1}" for i in range(len(documents))]
)
print(tfidf_df)

# Cosine Similarity
from sklearn.metrics.pairwise import cosine_similarity
print("\\n=== Cosine Similarity Matrix ===")
sim_matrix = cosine_similarity(tfidf_matrix)
sim_df = pd.DataFrame(
    sim_matrix.round(4),
    columns=[f"Doc {i+1}" for i in range(len(documents))],
    index=[f"Doc {i+1}" for i in range(len(documents))]
)
print(sim_df)`
      }
    ]
  }
];
