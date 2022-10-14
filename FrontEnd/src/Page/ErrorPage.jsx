import React from 'react';
import error_img from 'Image/error_img.jpeg';

// .errorpage {
// 	width: 100%;
// 	height: 100%;
// 	text-align: center;
// }
// .errorpage img {
// 	width: 50%;
// }

function ErrorPage() {
	return (
		<div className="errorpage">
			<img src={error_img} alt="Error Img"></img>
			{/* <h1>Hello</h1> */}
		</div>
	);
}

export default ErrorPage;
