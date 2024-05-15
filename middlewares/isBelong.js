const AppError = require( '../utils/AppError' );
const asyncWrapper = require( 'express-async-handler' );

const isBelong = ( Model ) => {
	return (async ( req, res, next ) => {
		const userId = req.user.id;
		if (!userId) return next( new AppError( 'unAuthorized', 400 ) );
		
		const document = await Model.findOne( {user: userId} );
if (!document) return next( new AppError( 'unAuthorized', 400 ) );

next();
});

};

module.exports = {isBelong};