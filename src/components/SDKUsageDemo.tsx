'use client';
import {FC} from 'react';

async function addSticky() {
  const stickyNote = await miro.board.createStickyNote({
    content: 'Hello, World!',
  });
  await miro.board.viewport.zoomTo(stickyNote);
}

export const SDKUsageDemo: FC = () => {
  return (
    <div>
      <h3>SDK Usage Demo</h3>
      <p className="p-small">SDK doesnt need to be authenticated.</p>
      <p>
        Apps that use the SDK should run inside a Miro board. During
        development, you can open this app inside a{' '}
        <a href="https://developers.miro.com/docs/build-your-first-hello-world-app#step-2-try-out-your-app-in-miro">
          Miro board
        </a>
        .
      </p>
      <button
        type="button"
        onClick={addSticky}
        className="button button-primary"
      >
        Add a sticky
      </button>
    </div>
  );
};
