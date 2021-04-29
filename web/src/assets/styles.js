import styled, { css } from "styled-components";
import { theme } from "./theme";
import { media } from "./media";
import { rgba } from "polished";
import * as Icon from "react-feather";

export const Wrapper = styled.div`
  padding: 1rem;
  background: ${theme.background};
  color: ${theme.text};

  ${media.desktop} {
    max-width: 800px;
    margin: 1rem auto;
  }
`;

export const Check = styled(Icon.Check)`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  padding: 0.5rem;
  width: 2.25rem;
  height: 2.25rem;
  stroke: ${theme.white};
  border-radius: 12px;
`;
export const Heading = styled.img`
  margin: 0;
`;
export const Box = styled.div`
  position: relative;
  display: block;
  width: calc((100vw - 4rem) / 3);
  margin-bottom: 1rem;
  border: 1px solid ${theme.border};
  background: white;
  transition: all 0.2s ease;

  img {
    width: calc((100vw - 4rem) / 3);
  }

  ${(props) => {
    if (props.isSelected) {
      return css`
        background-color: ${rgba(theme.primary, 0.2)};
        border: 2px solid ${theme.primary};

        ${Check} {
          stroke: ${theme.primary};
          // background: ${theme.primary};
        }
      `;
    }
  }}
  &:active {
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.15);
  }
  border-radius: 12px;
  ${media.mobile} {
    &:nth-child(3n + 2) {
      margin: 0 1rem 1rem;
    }
  }
  ${media.desktop} {
    width: calc((800px - 5rem) / 4);
    &:nth-child(4n + 2) {
      margin: 0 1rem 1rem;
    }
    &:nth-child(4n + 3) {
      margin: 0 1rem 1rem 0;
    }
  }
`;

export const Boxes = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 1rem 0 2rem;

  .css-yk16xz-control {
    border-radius: 8px;
  }

  .css-1rhbuit-multiValue {
    background-color: ${theme.grayLight};
  }

  #react-select-3-input {
    height: 36px;
  }
`;

export const ToggleMenu = styled.div`
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${theme.grayLight};
  svg {
    margin: 0.5rem;
  }
`;

export const Search = styled.button`
  border: none;
  outline: none;
  padding: 0.5rem;
  background-color: ${theme.primary};
  display: flex;
  align-items: center;
  justify-content: space-around;
  // flex-basis: 300px;
  color: white;
  border-radius: 6px;
  width: 100%;
  height: 48px;
  max-width: 500px;

  svg.search {
    stroke: ${theme.background};
  }
`;

export const Verified = styled.div`
  background-color: ${theme.greenBack};
  color: ${theme.greenText};
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  margin: 0.5rem 0;
`;

export const Result = styled.div`
  display: flex;
  border: 1px solid ${theme.border};
  background: white;
  margin: 1.5rem 0;
  padding: 1rem;
  flex-direction: column;
  border-radius: 6px;

  .header {
    justify-content: space-between;
    color: ${theme.gray};
    text-transform: capitalize;
    b {
      font-size: 1.15rem;
      font-weight: 600;
      color: ${theme.grayDarker};
      line-height: 1.2;
      display: block;
      margin-bottom: 0.25rem;
    }
  }

  .details {
    margin: 1rem 0 0.5rem;
    font-size: 1rem;

    b {
      font-weight: 400;
      line-height: 1.2;
    }

    &__col {
      margin-bottom: 0.5rem;

      p {
        display: flex;
        align-items: center;

        span {
          display: block;
          min-width: 120px;
          font-size: 1rem;
        }
      }
    }

    &__contact {
      &-phone {
        display: flex;
        margin-bottom: 0.5rem;

        p:first-child {
          min-width: 120px;
          font-size: 1rem;
        }
        a {
          color: ${theme.primary};
          &:not(:last-child)::after {
            content: ", ";
          }
          &:last-child {
            word-break: break-word;
          }
        }
      }

      &-address {
        p {
          display: flex;

          span {
            display: block;
            min-width: 120px;
          }
        }
      }
    }
  }

  .footer {
    font-size: 0.875rem;
    align-items: center;

    ${media.desktop} {
      display: flex;
      justify-content: space-between;
    }

    p {
      margin: 0;
    }

    .data {
    }
  }
`;
export const OtherResourcesLink = styled.div``;
