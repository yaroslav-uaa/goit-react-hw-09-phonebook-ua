import React from 'react';
import { useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import h from './HomeView.module.css';

export default function HomeView() {
  const userName = useSelector(authSelectors.getUserName);
  return (
    <>
      <div className={h.bgimg1}>
        <div class={h.caption}>
          <span class={h.border}>PhoneBook</span>
        </div>
      </div>
      <div
        className={h.content}
        style={{
          color: '#777',
          backgroundColor: 'white',
          textAlign: 'center',
          padding: '50px 80px',
        }}
      >
        <h3 style={{ textAlign: 'center' }}>Managing your contacts</h3>
        <p>
          What are contacts? Your contacts list {userName} is one of the most
          important things in your pocket. It's where you'll save contact
          information for the people you know, including their names, phone
          numbers. This information isn't just for your records - it's also used
          by other apps.
        </p>
      </div>
      <div className={h.bgimg2}>
        <div className={h.caption}>
          <span
            className={h.border}
            style={{
              backgroundColor: 'transparent',
              fontSize: '25px',
              color: '#f7f7f7',
            }}
          >
            ADD YOUR CONTACT
          </span>
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <div
          className={h.content}
          style={{
            color: '#ddd',
            backgroundColor: '#282E34',
            textAlign: 'center',
            padding: '50px 80px',
          }}
        >
          <p>
            To add a new person to your list of contacts, you need to be
            connected to the Internet and to your account.
          </p>
        </div>
      </div>
      <div className={h.bgimg3}>
        <div className={h.caption}>
          <span
            className={h.border}
            style={{
              backgroundColor: 'transparent',
              fontSize: '25px',
              color: '#f7f7f7',
            }}
          >
            DELETE YOUR CONTACTS
          </span>
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <div
          className={h.content}
          style={{
            color: '#ddd',
            backgroundColor: '#282E34',
            textAlign: 'center',
            padding: '50px 80px',
          }}
        >
          <p>
            You can delete contacts individually from your suggested contacts
            list.
          </p>
        </div>
      </div>
      <div className={h.bgimg4}>
        <div className={h.caption}>
          <span className={h.border}>ENJOY IT!</span>
        </div>
      </div>
    </>
  );
}
