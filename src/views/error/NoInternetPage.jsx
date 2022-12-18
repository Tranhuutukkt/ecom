import { useScrollTop } from '@/hooks';
import React from 'react';

const NoInternet = () => {
  useScrollTop();

  return (
    <div className="page-not-found">
      <h1>:( インターネット接続なし。</h1>
      <p>ネットワーク接続を確認して、もう一度お試しください。</p>
      <br />
      <button
        className="button"
        onClick={() => window.location.reload(true)}
        type="button"
      >
        再試行する
      </button>
    </div>

  );
};

export default NoInternet;
