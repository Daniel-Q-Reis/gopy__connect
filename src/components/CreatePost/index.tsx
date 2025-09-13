import React, { useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';

import { createPost as apiCreatePost } from '../../utils/api';
import { PostAction } from '..';
import {
  InsertEmoticonOutlinedIcon,
  PhotoLibraryRoundedIcon,
  VideocamRoundedIcon,
  SendRoundedIcon
} from '../../utils/icons';

import './CreatePost.scss';

interface CreatePostProps {
  photoUrl?: string;
  username: string | null;
}

function CreatePost({ photoUrl, username }: CreatePostProps): React.ReactElement {
  const [input, setInput] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    await apiCreatePost({ content: input, privacy: 'public' });

    setInput('');
    setImgUrl('');
  };

  return (
    <div className='createPost'>
      <div className='top'>
        <Avatar src={photoUrl} />
        <form className='form'>
          <input
            className='textInput'
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`What's on your mind, ${username}?`}
          />
          <input
            className='imgUrlInput'
            value={imgUrl}
            onChange={e => setImgUrl(e.target.value)}
            placeholder='Image URL (optional)'
          />
          <IconButton className='button' type='submit' onClick={handleSubmit}>
            <SendRoundedIcon color='primary' />
          </IconButton>
        </form>
      </div>
      <div className='bottom'>
        {bottomIcon.map(({ Icon, title, color }, index) => (
          <PostAction key={index} Icon={Icon} title={title} color={color} />
        ))}
      </div>
    </div>
  );
}

export default CreatePost;

const bottomIcon = [
  {
    Icon: VideocamRoundedIcon,
    title: 'Live Video',
    color: 'red'
  },
  {
    Icon: PhotoLibraryRoundedIcon,
    title: 'Photo/Video',
    color: 'green'
  },
  {
    Icon: InsertEmoticonOutlinedIcon,
    title: 'Feeling/Activity',
    color: 'orange'
  }
];
