let $container=$('.gallery'),
    $loadMoreBtn=$('.load-more'),
    $addItemCount=8, //클릭할때마다 보여지는 갯수
    $added=0, //더보기 버튼 사라지게 할 용도
    $allDate=[]; //배열 json 파일을 불러와서 넣어 놓을 공간

    $container.masonry({
        // options
        itemSelector: '.gallery-item',
        columnWidth: 270,
        gutter:20
      });

    $.getJSON('./data/content.json', function(data){
        // console.log(data)
        $allDate=data;

        addItem();
        $loadMoreBtn.click(addItem)
    })

    function addItem(data){
        let element=[];
        let sliceData;

        sliceData=$allDate.slice($added, $added += $addItemCount)
        console.log(sliceData)

        $.each(sliceData, function(idx, item){
            let itemHTML=
            `<li class="gallery-item">
                <a href="">
                    <figure>
                        <img src="${item.images.thumb}" alt="${item.title}">
                        <figcaption>
                             ${item.title}
                        </figcaption>
                    </figure>
                </a>
            </li>`;
            element.push($(itemHTML).get(0))
        });

        $container.append(element);

        if($added< $allDate.length){
            $loadMoreBtn.show()
        }else{
            $loadMoreBtn.hide()
        }

        $container.imagesLoaded(function(){
            $container.masonry('appended', element)
        });
    }