import React, { useState, useEffect } from 'react';
import StoryReel from '../StoryReel';
import CreatePost from '../CreatePost';
import Post from '../Post';
import { getFeed } from '../../utils/api';

import './Feed.scss';

interface FeedProps {
  photoUrl?: string;
  username: string | null;
}

function Feed({ photoUrl, username }: FeedProps): React.ReactElement {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchFeed = async () => {
      const feed = await getFeed();
      setPosts(feed || []);
    };
    fetchFeed();
  }, []);

  return (
    <div className='feed'>
      <StoryReel photoUrl={photoUrl} />
      <CreatePost photoUrl={photoUrl} username={username} />
      {posts.map((post: any) => (
        <Post
          key={post.id}
          username={post.user_name}
          profilePic={post.profile_picture_url}
          text={post.content}
          image={post.image_url}
          timestamp={new Date(post.created_at).toDateString()}
        />
      ))}
    </div>
  );
}

export default Feed;
