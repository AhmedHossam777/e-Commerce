const AppError = require( '../utils/AppError' );
const ApiFeatures = require( '../utils/ApiFeatures' );
const asyncWrapper = require( 'express-async-handler' );
const slugify = require( 'slugify' );

const deleteOne = ( Model ) =>
	asyncWrapper( async ( req, res, next ) => {
		const {id} = req.params || req.user;
		if (!id) {
			return next( new AppError( 'please enter document id', 400 ) );
		}
		
		const document = await Model.findById( id );
		if (!document) {
			return next( new AppError( 'there is no document with that id', 404 ) );
		}
		
		await Model.findByIdAndDelete( id );
		res.status( 204 ).json( {
			status: 'success',
			message: 'document deleted successfully',
		} );
	} );

const updateOne = ( Model ) =>
	asyncWrapper( async ( req, res, next ) => {
		const {id} = req.params || req.user;
		if (!id) {
			return next( new AppError( 'please enter a document id', 400 ) );
		}
		
		const document = await Model.findById( id );
		if (!document) {
			return next( new AppError( 'there is no document with that id', 404 ) );
		}
		
		const newDocument = await Model.findByIdAndUpdate( id, req.body, {
			new: true,
		} );
		if (req.body.name) {
			newDocument.slug = slugify( req.body.name );
			await newDocument.save();
		}
		
		res.status( 200 ).json( {
			status: 'success',
			newDocument,
		} );
	} );

const getOne = ( Model ) =>
	asyncWrapper( async ( req, res, next ) => {
		const {id} = req.params;
		
		const document = await Model.findById( id );
		if (!document) {
			return next( new AppError( `there is no document with that id ${id}`, 404 ) );
		}
		res.status( 200 ).json( {
			status: 'success',
			document,
		} );
	} );

const createOne = ( Model, ParentModel ) =>
	asyncWrapper( async ( req, res, next ) => {
		const parent = req.body.parent || req.params.parent;
		if (req.body.parent || req.params.parent) {
			const parentDocument = await ParentModel.findById( parent );
			if (!parentDocument) {
				return next( new AppError( 'there is no parent with that id', 404 ) );
			}
		}
		const user = req.user.id;
		const document = await Model.create( {...req.body, user, parent} );
		res.status( 201 ).json( {
			status: 'success',
			document,
		} );
	} );

const getAll = ( Model, ParentModel ) =>
	asyncWrapper( async ( req, res, next ) => {
		const numberOfDocuments = await Model.countDocuments();
		const apiFeatures = new ApiFeatures( Model.find(), req.query )
			.paginate( numberOfDocuments )
			.filter()
			.sort()
			.limitFields()
			.search();
		
		const {mongooseQuery, paginationResult} = apiFeatures;
		
		if (req.params.parent) {
			const parentDocument = await ParentModel.findById( req.params.parent );
			if (!parentDocument) {
				return next( new AppError( 'there is no document with that id', 404 ) );
			}
			apiFeatures.mongooseQuery = Model.find( {parent: req.params.parent} );
		}
		const documents = await mongooseQuery;
		if (!documents) {
			return next( new AppError( 'the is no documents yet', 404 ) );
		}
		res.status( 200 ).json( {
			results: documents.length,
			status: 'success',
			paginationResult,
			documents,
		} );
	} );

module.exports = {
	deleteOne,
	updateOne,
	getOne,
	createOne,
	getAll,
};