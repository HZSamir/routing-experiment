import React from 'react'
import { Link } from 'react-router-dom'

export default function ClientCard({ client }) {
    // Could be ClientCard(props)
    // And then to use client, we could just use props.client


    // Logic....

    return (
        <div>
            <Link to={`/search/${client.customer_id}`}>{client.customer_lastname}</Link>
        </div>
    )
}
