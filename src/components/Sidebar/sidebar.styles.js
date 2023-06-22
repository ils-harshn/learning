import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

export const SidebarTabContainer = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`

export const SidebarTab = styled.li`
    height: 34px;
    /* border: 1px solid green; */
    `

export const SidebarLabel = styled.div`
    display: flex;
    text-decoration: none;
    font-size: 11px;
    align-items: center;
    padding-left: 8px;
    height: inherit;
    color: #6a737c;
`

export const SidebarLink = styled(NavLink)`
    display: flex;
    text-decoration: none;
    font-size: 11px;
    align-items: center;
    padding-left: 8px;
    height: inherit;
    color: #6a737c;

    &:hover {
        color: black;
    }

    &.active {
        font-size: 13px;
        font-weight: 700;
        color: black;
        background-color: #f1f2f3;
        border-right: 3px solid #f48225;
    }
`

export const SidebarSubLink = styled(SidebarLink)`
    font-size: 13px;
    padding-left: 30px;
`