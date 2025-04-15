use axum::{routing::get, Router};
use std::net::SocketAddr;
use axum::serve;
use tokio::net::TcpListener;

#[tokio::main]
async fn main() {
    let app = Router::new().route("/predict", get(|| async { "ML prediction here" }));

    let addr = SocketAddr::from(([127, 0, 0, 1], 8081));
    let listener = TcpListener::bind(addr).await.unwrap();

    println!("Serving on http://{}", addr);

    serve(listener, app).await.unwrap();
}
