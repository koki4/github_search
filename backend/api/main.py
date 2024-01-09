from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
app = FastAPI()

# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # フロントエンドのアプリケーションのURL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def search_github_repositories(keyword: str, username: str, page: int):
    url = f'https://api.github.com/search/repositories?q={keyword}'\
        '+user:{username}&per_page=50&page={page}'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        result = [{"name": item['name'], "description": item['description'], "url": item['html_url']} for item in data['items']]
        total_count = data['total_count']
        return {"result":result, "total_count": total_count}
    else:
        print("検索に失敗")

@app.get("/hello")
async def hello():
    return {"message": "hello world!!"}

@app.get("/api/search")
def search(keyword: str, username: str, page: int):
    return search_github_repositories(keyword, username, page)