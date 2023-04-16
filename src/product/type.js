const productType = `#graphql
  type Category {
    id: ID!
    name: String!
    slug: String!
    createdAt: Datetime
    updatedAt: Datetime
  }

  type Review {
    id: ID!
    description: String
    rating: Int!
    user: User
    product: Product
    createdAt: Datetime
    updatedAt: Datetime
  }

  type Tag {
    id: ID!
    name: String!
    slug: String!
    createdAt: Datetime
    updatedAt: Datetime
  }

  type Like {
    id: ID!
    productId: ID!
    userId: ID!
    createdAt: Datetime
    updatedAt: Datetime
  }

  type Product {
    id: ID!
    name: String!
    slug: String!
    price: Int!
    image: String
    categoryId: ID!
    category: Category
    tags: [Tag]
    reviews: [Review]
    likedBy: [ID]
    ingredients: String
    createdAt: Datetime
    updatedAt: Datetime
    averageRating: Float
    likesCount: Int
  }

  type Review {
    id: ID!
    description: String
    rating: Int!
    user: User
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
  }

  type Edge {
    node: Product
    cursor: String
  }

  type ProductList {
    edges: [Edge]
    pageInfo: PageInfo
  }

  type TagList {
    tags: [Tag]!
  }

  type CategoryList {
    categories: [Category]!
  }

  type ReviewList {
    reviews: [Review]
  }

  type BestRatedProductList {
    products: [Product]
  }

  input Cursor {
    id: Int!
  }
  
  type ProductError implements BaseError {
    message: String!
  }

  type TagNotFound implements BaseError {
    message: String!
  }

  type CategoryNotFound implements BaseError {
    message: String!
  }

  type FailCreateReview implements BaseError {
    message: String!
  }

  type FailUpdateReview implements BaseError {
    message: String!
  }

  type FailLikeProduct implements BaseError {
    message: String!
  }

  type FailNeutralizeLikeProduct implements BaseError {
    message: String!
  }

  union BestRatedProductResult = BestRatedProductList | ProductError
  union ProductResult = Product | ProductError
  union ProductListResult = ProductList | ProductError
  union TagListResult = TagList | TagNotFound
  union CategoryListResult = CategoryList | CategoryNotFound
  union CreateReviewResult = Review | FailCreateReview
  union UpdateReviewResult = Review | FailUpdateReview
  union LikeProductResult = Like | FailLikeProduct
  union NeutralizeLikeProductResult = Like | FailNeutralizeLikeProduct
  
  type Query {
    getAllProductCategory: CategoryListResult
    getAllProductTag: TagListResult
    getAllReview: ReviewList
    getProductReviews(productId: Int!): ReviewList
    getFilteredProducts(take: Int, category: String!, tag: String, cursor: Cursor, keyword: String): ProductListResult
    getBestRatedProducts(category: String): BestRatedProductResult
    getProduct(slug: String!): ProductResult
    getTagsByCategory(category: String!): TagListResult
  }

  type Mutation {
    createReview(productId: Int!, description: String, rating: Int!): CreateReviewResult
    likeProduct(productId: Int!): LikeProductResult
    neutralizeLikeProduct(productId: Int!): NeutralizeLikeProductResult
    updateReview(description: String, rating: Int!, productId: Int!): UpdateReviewResult
  }
`;

export default productType;