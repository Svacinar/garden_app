import Link from 'next/link';
import NavStyles from '../styles/NavStyles';

export default function Nav() {
    return (
        <NavStyles>
            <Link href="/lawn">lawn</Link>
            <Link href="/smart">smart</Link>
            <Link href="/heating">heating</Link>
            <Link href="/lights">lights</Link>
            <Link href="/weather">weather</Link>
            <Link href="/login">login</Link>
        </NavStyles>
    )
}