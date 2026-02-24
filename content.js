// content.js
window.NOTES = [
  {
    id:"intro",
    title:"Overview",
    badge:"全体",
    tags:["授業まとめ","目次"],
    lead:"第1〜11回（全22PDF）で学んだ内容を、あとで見返しやすい形に圧縮して並べた。",
    points:[
      "基礎文法 → 制御構造 → 関数/スコープ → データ構造/NumPy → 可視化/数値解法",
      "標準ライブラリ・ファイル入出力・pandasで『データを扱う型』を作る",
      "OOP（カプセル化/多相性/継承）で設計の考え方を掴む",
      "連立一次方程式（直接法/反復法）とPDE（熱伝導）で数値計算の流れを体験"
    ],
    code:`# 正直忘れているものも多い\n# 一度は習ったので、すぐに思い出せるはず\n`
  },

  {
    id:"basics",
    title:"1) Basics",
    badge:"第1回",
    tags:["変数","文字列","コメント","開発の型"],
    lead:"Pythonの書き方・小さな演習を通じて、まず『動く』状態を作る回。",
    points:[
      "変数・四則演算・入力・余り・値の入れ替え",
      "文字列：添字・結合・置換などの基本操作",
      "可読性：変数名、コメント（# / docstring）"
    ],
    code:`# 文字列の基本例\ns = "hello"\nprint(s[0])\nprint(s.replace("h","H"))\n`
  },

  {
    id:"control",
    title:"2) Control Flow",
    badge:"第2回",
    tags:["if","for","while","設計"],
    lead:"フローチャートで流れを作ってから、if/for/whileに落とす。",
    points:[
      "条件分岐：if/elif/elseで分岐を書く",
      "反復：for/whileで『繰り返し』を作る",
      "例：素数判定など、アルゴリズムをコードにする"
    ],
    code:`# 素数っぽい判定（簡略）\nimport math\nn = 97\nis_prime = True\nfor k in range(2, int(math.sqrt(n))+1):\n    if n % k == 0:\n        is_prime = False\n        break\nprint(is_prime)\n`
  },

  {
    id:"functions",
    title:"3) Functions & Scope",
    badge:"第3回",
    tags:["関数","引数","戻り値","スコープ"],
    lead:"再利用できる形（関数）にして、変数の見え方（スコープ）を理解する。",
    points:[
      "関数：引数・戻り値・デフォルト引数・キーワード引数",
      "スコープ：ローカルとグローバル（同名の扱い）",
      "例：二分法で平方根 → 任意関数の解を探す形へ"
    ],
    code:`def bisection_sqrt(a, it=40):\n    x0, x1 = 0.0, max(1.0, a)\n    for _ in range(it):\n        xm = (x0 + x1) / 2\n        if xm*xm < a:\n            x0 = xm\n        else:\n            x1 = xm\n    return (x0 + x1) / 2\n\nprint(bisection_sqrt(2))\n`
  },

  {
    id:"data",
    title:"4) Data Structures & NumPy",
    badge:"第4回",
    tags:["list","dict","copy","NumPy","計算量"],
    lead:"データ構造の性質（変更可能/ハッシュ）やコピー、NumPyの基礎、計算量感覚。",
    points:[
      "list/tuple/set/dictの使い分け（型の性質）",
      "浅いコピー/深いコピーの違い",
      "NumPy配列と配列演算",
      "計算量（O記法）：増えると何が起きるか"
    ],
    code:`import numpy as np\nx = np.array([1,2,3])\ny = np.array([10,20,30])\nprint(x + y)\n`
  },

  {
    id:"plot_ode",
    title:"5) Plot & ODE",
    badge:"第5回",
    tags:["matplotlib","オイラー法"],
    lead:"結果を図で確認する流れと、常微分方程式を刻み幅dtで数値的に更新する考え方。",
    points:[
      "matplotlib：描画して確認する習慣",
      "オイラー法：x(t+dt)=x(t)+dt*f(t,x) の基本"
    ],
    code:`# 例：指数減衰 dx/dt = -kx をオイラーで\nk, dt, T = 1.0, 0.01, 2.0\nx = 1.0\nt = 0.0\nwhile t < T:\n    x = x + dt * (-k*x)\n    t += dt\nprint(x)\n`
  },

  {
    id:"io",
    title:"6) Stdlib / Files / Pandas",
    badge:"第6回",
    tags:["sys","os","ファイル","csv","pandas"],
    lead:"標準ライブラリとファイル入出力、CSVをpandasで扱う型を作る回。",
    points:[
      "sys/os/math/random/statistics/time、f文字列",
      "with-openで安全なファイル操作（read/write/strip）",
      "pandasでCSV読み書き、列抽出、計算、保存、可視化"
    ],
    code:`import pandas as pd\n\ndf = pd.read_csv("data.csv", encoding="utf-8")\ncol = df.iloc[:, 0]\nprint(col.head())\n\ndf.to_csv("out.csv", index=False)\n`
  },

  {
    id:"oop",
    title:"7-8) OOP",
    badge:"第7-8回",
    tags:["クラス","カプセル化","多相性","継承","super"],
    lead:"カプセル化・多相性・継承で、コードを“増やしやすい形”にする。",
    points:[
      "クラス/インスタンス、__init__、変数の持ち方",
      "カプセル化：公開/非公開の考え方（_ / __）",
      "多相性：共通メソッド（例：draw）で同じ扱い",
      "継承：super、override、多重継承の注意"
    ],
    code:`class Shape:\n    def draw(self):\n        raise NotImplementedError\n\nclass Circle(Shape):\n    def __init__(self, r):\n        self.r = r\n    def draw(self):\n        return f\"Circle(r={self.r})\"\n\nitems = [Circle(2), Circle(5)]\nfor s in items:\n    print(s.draw())\n`
  },

  {
    id:"la",
    title:"9) Linear Algebra (Numerical)",
    badge:"第9回",
    tags:["ガウス消去","ヤコビ","LU","精度","時間"],
    lead:"同じ問題でも“どう解くか”で精度・時間が変わる、という視点を持つ。",
    points:[
      "連立一次方程式：直接法（ガウス消去など）と反復法（ヤコビなど）",
      "NumPy/Scipy：solve, LU, inv/pinv を使った比較",
      "精度（誤差）と計算時間（スケール）の両方を見る"
    ],
    code:`import numpy as np\nA = np.array([[3.,1.],[1.,2.]])\nb = np.array([9.,8.])\nx = np.linalg.solve(A,b)\nprint(x)\n`
  },

  {
    id:"pde",
    title:"10-11) Heat Simulation (PDE)",
    badge:"第10-11回",
    tags:["差分法","FTCS","熱伝導","CN法","2次元","アニメ"],
    lead:"差分法で熱伝導（PDE）を離散化して解く。最後は2次元＋可視化/アニメまで。",
    points:[
      "差分：前進/後退/中心差分（考え方の型）",
      "FTCSで1次元熱伝導を時間発展させる",
      "クランク–ニコルソン法：中点平均→連立方程式Ax=bを解く形",
      "2次元への拡張、3D描画やフレーム積みでアニメ化"
    ],
    code:`# 擬似コード（FTCSの雰囲気）\n# for n in time:\n#   for i in space:\n#     u_new[i] = u[i] + alpha*dt/dx**2*(u[i+1]-2*u[i]+u[i-1])\n`
  },
];
