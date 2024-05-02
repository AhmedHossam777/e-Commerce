class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    const queryObject = { ...this.queryString };
    const excludeFields = ['page', 'limit', 'sort', 'fields', 'keyword'];

    excludeFields.forEach((field) => delete queryObject[field]);
    let queryStr = JSON.stringify(queryObject);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const filteredQueryObject = JSON.parse(queryStr);
    this.mongooseQuery = this.mongooseQuery.find(filteredQueryObject);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select('-__v');
    }
    return this;
  }

  search() {
    if (this.queryString.keyword) {
      const query = {};
      query.$or = [
        { title: { $regex: this.queryString.keyword, $options: 'i' } }, // the option is to match even the word is capital
        { description: { $regex: this.queryString.keyword, $options: 'i' } },
      ];

      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }

  paginate(numberOfDocuments) {
    const page = this.queryString.page || 1;
    const limit = this.queryString.limit || 5;
    const skip = (page - 1) * limit || 0;
    const endIndex = page * limit;

    const pagination = {};
    pagination.page = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(numberOfDocuments / limit);

    // next page
    if (endIndex < numberOfDocuments) {
      pagination.next = page + 1;
    }

    // previous page
    if (skip > 0) {
      pagination.prev = page - 1;
    }

    this.mongooseQuery = this.mongooseQuery.limit(limit).skip(skip);
    this.paginationResult = pagination;
    return this;
  }
}

module.exports = ApiFeatures;
