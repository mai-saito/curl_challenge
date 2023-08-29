import React from 'react';

type Comment = {
	id: any;
	name: any;
	comment: any;
}

const CommentList: React.FC = () => {
	const [comments, setComments] = React.useState<Comment[] | null>(null);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				// TODO: Tantative endpoint
				const res = await fetch('/comments');
				const json: React.SetStateAction<Comment[] | null> = await res.json();

				// Set state
				setComments(json);
			} catch (error: unknown) {
				if (error instanceof Error) {
					console.log('Error: ' + error.message);
				}
			}
		}
		fetchData();
	}, []);

	return (
		<div className='app'>
			<h1>Curl Command Challenge</h1>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>名前</th>
						<th>コメント</th>
					</tr>
				</thead>
				<tbody>
					{comments?.map((comment: Comment) => (
						<tr key={comment.id}>
							<td>{comment.id}</td>
							<td>{comment.name}</td>
							<td>{comment.comment}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default CommentList;
