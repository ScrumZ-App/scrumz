<template>
  <div class="home">
    <div class="primary-column">
      <div class="logo">
        <span>scrumz</span>
      </div>
      <div class="coffee-card">
        <div class="front">
          <div class="title">coffee</div>
          <div class="icon">
            <img src="~/assets/coffee.svg" />
          </div>
          <div class="status-icon"></div>
        </div>
        <div class="back">
          <h1>Please Support Us 🥺</h1>
        </div>
      </div>
    </div>
    <div class="secondary-column">
      <div class="mood-card">
        <div class="title">mood</div>
        <div class="icon">
          <img src="~/assets/mood.svg" />
        </div>
      </div>
    </div>
    <div class="ternary-column">
      <div class="info-card">
        <span>
          scrumz.app was developed for you to gather with your team members for
          story point estimation.
        </span>
        <span>
          work together and achieve success in your projects with our fun and
          flexible structure provided by scrum poker.
        </span>
      </div>
      <div class="button">
        <input type="text" placeholder="room code" />
        <div class="status-icon"></div>
      </div>
      <div class="button primary">
        <span> create<br />room </span>
        <div class="status-icon"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home {
  display: flex;
  gap: 2rem;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 4rem 0 4rem 4rem;

  .primary-column {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .logo {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16rem;
      height: 8rem;
      font-size: 4.5rem;
      font-weight: 600;
      background: var(--color-primary);
      color: var(--color-white);
      border-radius: var(--border-radius);
      letter-spacing: -0.1rem;
      span {
        padding-bottom: 1rem;
      }
    }
    .coffee-card {
      width: 16rem;
      height: 24rem;
      position: relative;

      .front,
      .back {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        transition: 0.5s;
        background: var(--color-white);
        border-radius: var(--border-radius);
      }

      .front {
        transform: perspective(1000px) rotateY(0deg);

        .title {
          position: absolute;
          top: 1rem;
          left: 1.5rem;
          font-size: 2rem;
          font-weight: 600;
          color: var(--color-black);
        }

        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .status-icon {
          width: 3rem;
          height: 3rem;
          background: var(--color-black);
          border-radius: 50%;
          position: absolute;
          bottom: 1rem;
          right: 1rem;
        }
      }

      .back {
        transform: perspective(1000px) rotateY(-180deg);

        display: flex;
        align-items: center;
        justify-content: center;

        h1 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--color-black);
          text-align: center;
          padding: 1rem;
        }
      }

      &:hover {
        .front {
          transform: perspective(1000px) rotateY(180deg);
        }
        .back {
          transform: perspective(1000px) rotateY(0);
        }
      }
    }
  }

  .secondary-column {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .mood-card {
      width: 34rem;
      height: 34rem;
      background: var(--color-white);
      border-radius: var(--border-radius);
      position: relative;

      .title {
        position: absolute;
        top: 1rem;
        left: 1.5rem;
        font-size: 2rem;
        font-weight: 600;
        color: var(--color-black);
      }

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    }
  }

  .ternary-column {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 16rem;

    .info-card {
      height: 18rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1rem;
      font-size: 1.1rem;
      color: var(--color-black);
      background: var(--color-white);
      border-radius: var(--border-radius);
      padding: 1.5rem 2rem;
      text-wrap: balance;
      span {
        text-align: left;
      }
    }

    .button {
      cursor: pointer;
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-white);
      color: var(--color-black);
      border-radius: var(--border-radius);
      text-align: center;
      text-decoration: none;
      font-size: 2rem;
      position: relative;

      span {
        line-height: 2rem;
      }

      input {
        width: 100%;
        height: 100%;
        border: none;
        background: transparent;
        font-size: 2rem;
        padding: 0 1rem;
        color: var(--color-black);
        padding-right: 4rem;
        padding-left: 2rem;
        border-radius: var(--border-radius);
        box-shadow: 0 0 0 0px var(--color-background),
          0 0 0 0px var(--color-primary);
        transition: box-shadow 0.2s ease-in-out;

        &:focus {
          outline: none;
          box-shadow: 0 0 0 2px var(--color-background),
            0 0 0 4px var(--color-primary);
        }

        &::placeholder {
          color: var(--color-faded);
        }
      }

      .status-icon {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        position: absolute;
        bottom: 0.5rem;
        right: 0.5rem;
        background: var(--color-black);
      }

      &.primary {
        background: var(--color-primary);
        color: var(--color-white);
        height: 8rem;
        text-align: left;
        padding: 0 0 0.3rem 2rem;
        font-size: 2.5rem;
        justify-content: flex-start;
        position: relative;
        overflow: hidden;

        &:before {
          position: absolute;
          content: '';
          display: inline-block;
          top: -180px;
          left: 0;
          width: 30px;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.2);
        }

        &:hover {
          &:before {
            animation: shiny 1s ease-in-out;
          }
          .status-icon {
            animation: bounce 0.5s cubic-bezier(0.75, -0.5, 0.25, 1.5);
          }
        }

        .status-icon {
          bottom: 1rem;
          right: 1rem;
          background: var(--color-white);
        }
      }
    }
  }
}
</style>
