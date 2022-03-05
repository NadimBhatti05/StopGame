var stopped = true;

function getElementTopLeft(id) {
	var ele = document.getElementById(id);
	var top = 0;
	var left = 0;

	while (ele.tagName != 'BODY') {
		top += ele.offsetTop;
		left += ele.offsetLeft;
		left += 100;
		ele = ele.offsetParent;
	}

	return left;
}

function getElementTopLeftClass(id) {
	var ele = document.querySelector('.' + id);
	var top = 0;
	var left = 0;
	var width = ele.clientWidth;

	while (ele.tagName != 'BODY') {
		top += ele.offsetTop;
		left += ele.offsetLeft;
		ele = ele.offsetParent;
	}

	var right = left + width;

	return { left: left, right: right };
}

function refresh(){
	location.reload();
}

function move() {
	document.getElementById('cloudpic').style.animationPlayState = 'running';
	stopped = false;
}

function stop() {
	document.getElementById('cloudpic').style.animationPlayState = 'paused';
	if (!stopped) {
		setTimeout(() => {
			var posImg = getElementTopLeft('cloudpic');
			const points = [1, 2, 5, 10, 5, 2, 1];
			const objectPointLeftAndRight = getPointPos();
			for (let i = 0; i < objectPointLeftAndRight.length; i++) {
				if (
					objectPointLeftAndRight[i].left <= posImg &&
					objectPointLeftAndRight[i].right >= posImg
				) {
					const pointEl = document.querySelector('.points');
					let prevPoints = parseInt(pointEl.textContent, 10);
					pointEl.textContent = prevPoints + points[i];
				}
			}
			stopped = true;
		}, 100);
	}
}

const getPointPos = () => {
	const res = [];
	const arr = document.getElementById('ganz').children;
	for (let i = 0; i < arr.length; i++) {
		res.push(getElementTopLeftClass(arr[i].classList.value));
	}
	return res;
};
