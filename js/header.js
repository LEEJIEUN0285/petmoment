window.addEventListener("load",function(){
    let btn_gnb = this.document.querySelector(".btn_gnb")
    let gnb_modal = this.document.querySelector(".gnb_modal")
    let gnb_wrap = this.document.querySelector(".gnb_wrap")
    let btn_close = this.document.querySelector(".btn_close")

    // 메뉴 버튼 클릭 시 gnb나옴
    btn_gnb.addEventListener("click",function(){
        gnb_modal.classList.add("on")
        gnb_wrap.classList.add("on")
    })

    // 메뉴 닫기 버튼 클릭시 gnb들어감
    btn_close.addEventListener("click",function(){
        gnb_modal.classList.remove("on")
        gnb_wrap.classList.remove("on")
    })

    // 마우스 휠을 아래 위로 했을 때 버튼이 사라지거나 나옴
    let fixed_menu = this.document.querySelector(".btn_gnb")
    let btn_top = this.document.querySelector(".btn_top")
    let lastScrollTop = 0
    let hideTimeout1
    let hideTimeout2
    let working = false

    this.window.addEventListener("scroll",function(){

        if(working){return}
        //스크롤을 했을 때 실행되는 동작

        let scrollTop = this.document.documentElement.scrollTop
        //위에서 스크롤바가 얼만큼 내려왔는지 계산하여 변수에 저장

        if(scrollTop < lastScrollTop){
            //마우스 휠을 위로 올렸을 때
            fixed_menu.classList.add("on")
            btn_top.classList.add("on")

            //이미 존재하는 예약 타임이 있다면 제거
            if(hideTimeout1){
                this.clearTimeout(hideTimeout1)
            }
            if(hideTimeout2){
                this.clearTimeout(hideTimeout2)
            }

            hideTimeout1 = this.setTimeout(function(){
                //2초 뒤에는 고정메뉴가 사라짐
                fixed_menu.classList.remove("on")
            },2000)
            hideTimeout2 = this.setTimeout(function(){
                //2초 뒤에는 고정메뉴가 사라짐
                btn_top.classList.remove("on")
            },2000)
        }else{
            //마우스 휠을 아래로 내렸을 때
            fixed_menu.classList.remove("on")
            btn_top.classList.remove("on")
        }
        lastScrollTop = scrollTop
    })

    //하단 메뉴에 마우스를 올리면 기존에 설정되어있었던 2초뒤에 사라지는 동작이 취소됨
    fixed_menu.addEventListener("mouseover",function(){
        clearTimeout(hideTimeout1)
    })
    btn_top.addEventListener("mouseover",function(){
        clearTimeout(hideTimeout2)
    })

    fixed_menu.addEventListener("mouseout",function(){
        hideTimeout1 = setTimeout(function(){
            //2초 뒤에는 고정메뉴가 사라짐
            fixed_menu.classList.remove("on")
        },2000)
    })
    btn_top.addEventListener("mouseout",function(){
        hideTimeout2 = setTimeout(function(){
            //2초 뒤에는 고정메뉴가 사라짐
            btn_top.classList.remove("on")
        },2000)
    })

    //위로가기 버튼을 클릭하면 페이지 최상단으로 부드럽게 스크롤하여 이동되는 기능
    btn_top.addEventListener("click",function(e){
        e.preventDefault()
        btn_top.classList.remove("on")
        working = true
        window.scrollTo({top:0,behavior:"smooth"})
        setTimeout(function(){
            working = false
        },1000)
    })
})