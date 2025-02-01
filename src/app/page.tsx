import React from 'react';
import {Board} from '@mirohq/miro-api';

import initMiroAPI from '../utils/initMiroAPI';
import '../assets/style.css';

const getBoards = async () => {
  const {miro, userId} = initMiroAPI();

  // redirect to auth url if user has not authorized the app
  if (!userId || !(await miro.isAuthorized(userId))) {
    return {
      authUrl: miro.getAuthUrl(),
    };
  }

  const api = miro.as(userId);

  const boards: Board[] = [];
  for await (const board of api.getAllBoards()) {
    boards.push(board);
  }

  return {
    boards,
  };
};

export default async function Page() {
  const {boards, authUrl} = await getBoards();

  return (
    <div>
      <h3>API usage demo</h3>
      <p className="p-small">API Calls need to be authenticated</p>
      <p>
        Apps that use the API usually would run on your own domain. During
        development, test on http://localhost:3000
      </p>
      {authUrl ? (
        <a className="button button-primary" href={authUrl} target="_blank">
          Login
        </a>
      ) : (
        <>
          <p>This is a list of all the boards that your user has access to:</p>

          <ul>
            {boards?.map((board) => (
              <li key={board.name}>{board.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
