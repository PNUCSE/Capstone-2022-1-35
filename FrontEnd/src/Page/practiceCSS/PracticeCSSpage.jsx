import './PracticeCSSpage.css';

function PracticeCSSpage() {
	window.onscroll = function () {
		myFunction();
	};

	function myFunction() {
		var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		var scrolled = (winScroll / height) * 100;
		document.getElementById('myBar').style.width = scrolled + '%';
	}
	return (
		<>
			<div class="header">
				<div class="progress-container">
					<div class="progress-bar" id="myBar"></div>
				</div>
			</div>

			<div class="content">
				<h3>Scroll Down to See The Effect</h3>
				<p>
					We have created a "progress bar" to <b>show how far a page has been scrolled</b>
					.
				</p>
				<p>
					It also <b>works when you scroll back up</b>.
				</p>
				<p>
					It is even <b>responsive</b>! Resize the browser window to see the effect.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<h3>Scroll Down to See The Effect</h3>
				<p>
					We have created a "progress bar" to <b>show how far a page has been scrolled</b>
					.
				</p>
				<p>
					It also <b>works when you scroll back up</b>.
				</p>
				<p>
					It is even <b>responsive</b>! Resize the browser window to see the effect.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<h3>Scroll Down to See The Effect</h3>
				<p>
					We have created a "progress bar" to <b>show how far a page has been scrolled</b>
					.
				</p>
				<p>
					It also <b>works when you scroll back up</b>.
				</p>
				<p>
					It is even <b>responsive</b>! Resize the browser window to see the effect.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<h3>Scroll Down to See The Effect</h3>
				<p>
					We have created a "progress bar" to <b>show how far a page has been scrolled</b>
					.
				</p>
				<p>
					It also <b>works when you scroll back up</b>.
				</p>
				<p>
					It is even <b>responsive</b>! Resize the browser window to see the effect.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
				<p>
					Some text to enable scrolling.. Lorem ipsum dolor sit amet, illum definitiones
					no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae
					gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec
					et. Inciderint efficiantur his ad. Eum no molestiae voluptatibus.
				</p>
			</div>
		</>
	);
}

export default PracticeCSSpage;
