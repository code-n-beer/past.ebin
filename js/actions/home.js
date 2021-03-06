import 'whatwg-fetch';
import {
	FETCH_RECENTS, POST_NEW_PASTE_SUCCEEDED, RESET_POST_DATA
}
from '../constants/ActionTypes';

const apiUrl = 'prototyping.xyz:3001';
export function fetchRecents( options ) {
	const {
		pageOffset
	} = options || {};
	const url = `http://${apiUrl}/recent/page/${pageOffset ? pageOffset : 0}`;
	console.log( `using api url ${url} ` );
	return dispatch => {
		fetch( url ).then( res => {
			res.json().then( result => {
				dispatch( {
					type: FETCH_RECENTS,
					recents: result
				} );
			} );
		} );
	};
}

function checkStatus( response ) {
	if ( response.status >= 200 && response.status < 300 ) {
		return response;
	} else {
		let error = new Error( response.statusText );
		error.response = response;
		throw error;
	}
}

function parseJSON( response ) {
	return response.json();
}

export function postNewPaste( options ) {
	console.log( 'posting new paste' );
	const {
		content
	} = options;

	console.log( content );

	const url = `http://${apiUrl}/new/`;
	console.log( `using post url ${url} ` );

	return dispatch => {
		fetch( url, {
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'text/plain'
				},
				body: content
			} )
			.then( checkStatus )
			.then( parseJSON )
			.then( ( data ) => {
				dispatch( {
					type: POST_NEW_PASTE_SUCCEEDED,
					result: data
				} );
			} );
	};
}

export function resetPostData() {
	return {
		type: RESET_POST_DATA
	};
}
